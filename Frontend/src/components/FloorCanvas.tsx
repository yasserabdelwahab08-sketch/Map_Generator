import { useEffect, useRef, useState, MouseEvent } from "react";
import { useLanguage } from "../lib/i18n";

export interface CanvasNode {
  id: string;
  x: number;
  y: number;
  label?: string;
  variant?: "default" | "start" | "end" | "path" | "entrance" | "elevator" | "stairs";
}

export interface CanvasEdge {
  from: string;
  to: string;
}

interface Props {
  imageUrl: string;
  nodes?: CanvasNode[];
  edges?: CanvasEdge[];
  activeSourceNodeId?: string | null;
  pathPoints?: { x: number; y: number }[];
  onImageClick?: (x: number, y: number) => void;
  onNodeClick?: (id: string) => void;
  onNodeDrag?: (id: string, x: number, y: number) => void;
  onEdgeClick?: (from: string, to: string) => void;
}

export default function FloorCanvas({
  imageUrl,
  nodes = [],
  edges = [],
  activeSourceNodeId,
  pathPoints,
  onImageClick,
  onNodeClick,
  onNodeDrag,
  onEdgeClick,
}: Props) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [naturalSize, setNaturalSize] = useState({ w: 1, h: 1 });
  const [renderedWidth, setRenderedWidth] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // --- Drag & drop for nodes ---
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  const handleLoad = () => {
    if (!imgRef.current) return;
    setNaturalSize({
      w: imgRef.current.naturalWidth || 1,
      h: imgRef.current.naturalHeight || 1,
    });
    setRenderedWidth(imgRef.current.clientWidth);
  };

  // Keep track of how big the image is on screen, so markers stay readable on small (phone) screens
  useEffect(() => {
    const img = imgRef.current;
    if (!img || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => setRenderedWidth(img.clientWidth));
    observer.observe(img);
    return () => observer.disconnect();
  }, [imageUrl]);

  // Coordinates relative to the original image size
  const getScaledCoordinates = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return null;
    const rect = imgRef.current.getBoundingClientRect();
    const scaleX = naturalSize.w / rect.width;
    const scaleY = naturalSize.h / rect.height;

    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);
    return { x, y };
  };

  const handleNodeMouseDown = (e: MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (e.button === 0) {
      setDraggedNodeId(nodeId);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const coords = getScaledCoordinates(e);
    if (!coords) return;

    // Dragging a node
    if (draggedNodeId && onNodeDrag) {
      onNodeDrag(draggedNodeId, coords.x, coords.y);
    } else if (activeSourceNodeId) {
      setMousePos(coords);
    }
  };

  const handleMouseUp = () => {
    setDraggedNodeId(null);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (draggedNodeId) return;
    if (!onImageClick) return;

    const coords = getScaledCoordinates(e);
    if (coords) {
      onImageClick(coords.x, coords.y);
    }
  };

  const polyline = pathPoints?.map((p) => `${p.x},${p.y}`).join(" ");
  const activeNode = nodes.find((n) => n.id === activeSourceNodeId);

  const baseSize = Math.max(naturalSize.w, naturalSize.h);
  // How many image pixels one screen pixel covers (0 until the image has loaded)
  const pxToImage = naturalSize.w > 1 && renderedWidth > 0 ? naturalSize.w / renderedWidth : 0;
  const strokeWidth = Math.max(baseSize / 250, 1.5 * pxToImage);
  const pathStrokeWidth = Math.max(baseSize / 180, 3 * pxToImage);
  const nodeRadius = Math.max(baseSize / 130, 5 * pxToImage);
  // Bigger invisible tap area around clickable nodes, so they are easy to hit with a finger
  const hitRadius = Math.max(nodeRadius * 1.6, 16 * pxToImage);

  return (
    <div
      ref={containerRef}
      className={`floor-canvas ${onImageClick ? "floor-canvas-editable" : ""}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img
        ref={imgRef}
        src={imageUrl}
        onLoad={handleLoad}
        alt="Floor plan"
        draggable={false}
      />

      <svg
        className="floor-canvas-overlay"
        viewBox={`0 0 ${naturalSize.w} ${naturalSize.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* 1. Edges (clickable to delete when editing) */}
        {edges.map((e, index) => {
          const fromNode = nodes.find((n) => n.id === e.from);
          const toNode = nodes.find((n) => n.id === e.to);
          if (!fromNode || !toNode) return null;

          return (
            <line
              key={`edge-${index}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#3b82f6"
              strokeWidth={strokeWidth}
              strokeOpacity={0.8}
              style={{ cursor: onEdgeClick ? "pointer" : "default" }}
              onClick={(ev) => {
                ev.stopPropagation();
                onEdgeClick?.(e.from, e.to);
              }}
            />
          );
        })}

        {/* 2. Navigation path */}
        {polyline && (
          <polyline
            points={polyline}
            fill="none"
            stroke="#22c55e"
            strokeWidth={pathStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* 3. Temporary line that follows the mouse while connecting nodes */}
        {activeNode && mousePos && (
          <line
            x1={activeNode.x}
            y1={activeNode.y}
            x2={mousePos.x}
            y2={mousePos.y}
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeWidth * 2},${strokeWidth * 2}`}
          />
        )}

        {/* 4. Nodes */}
        {nodes.map((n) => {
          const r = nodeRadius;
          const isSelected = n.id === activeSourceNodeId;

          // Node colour depends on its type
          const fill = isSelected
            ? "#ef4444"
            : n.variant === "entrance"
            ? "#10b981"
            : n.variant === "elevator"
            ? "#8b5cf6"
            : n.variant === "stairs"
            ? "#f59e0b"
            : n.variant === "start"
            ? "#22c55e"
            : n.variant === "end"
            ? "#ef4444"
            : "#64748b";

          return (
            <g
              key={n.id}
              onMouseDown={(ev) => handleNodeMouseDown(ev, n.id)}
              onClick={(ev) => {
                ev.stopPropagation();
                onNodeClick?.(n.id);
              }}
              style={{ cursor: onNodeClick ? "grab" : "default" }}
            >
              {onNodeClick && <circle cx={n.x} cy={n.y} r={hitRadius} fill="transparent" />}
              <circle
                cx={n.x}
                cy={n.y}
                r={isSelected ? r * 1.25 : r}
                fill={fill}
                stroke="#fff"
                strokeWidth={r / 4}
              />

              {n.label && (
                <text
                  className="canvas-node-label"
                  x={n.x + r * 1.6}
                  y={n.y + r / 2}
                  fontSize={r * 2.2}
                  fill="var(--node-label)"
                  stroke="var(--node-label-outline)"
                  strokeWidth={r / 6}
                  paintOrder="stroke"
                >
                  {n.label}
                </text>
              )}

              <title>{n.label || n.id}</title>
            </g>
          );
        })}
      </svg>

      {onImageClick && <span className="canvas-hint">{t("canvas.hint")}</span>}
    </div>
  );
}
