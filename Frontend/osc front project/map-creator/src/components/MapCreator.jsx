import React, { useState, useRef } from 'react';
import { 
  Plus, 
  MapPin, 
  Share2, 
  MousePointer, 
  Layers, 
  Trash2, 
  Download, 
  Image as ImageIcon,
  Building,
  X
} from 'lucide-react';

function MapCreator() {
  const [buildingName, setBuildingName] = useState('مبنى جديد');
  const [floors, setFloors] = useState([]);
  const [activeFloorId, setActiveFloorId] = useState(null);
  const [mode, setMode] = useState('select'); // 'select' | 'addNode' | 'createPath'
  const [selectedNode, setSelectedNode] = useState(null);
  const [pathSourceNode, setPathSourceNode] = useState(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  
  // New Floor Modal State
  const [isAddFloorOpen, setIsAddFloorOpen] = useState(false);
  const [newFloorName, setNewFloorName] = useState('');
  const [newFloorImage, setNewFloorImage] = useState(null);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Active Floor Data
  const activeFloor = floors.find(f => f.id === activeFloorId);

  // Handle Adding a New Floor
  const handleAddFloor = (e) => {
    e.preventDefault();
    if (!newFloorName || !newFloorImage) return;

    const newFloor = {
      id: Date.now().toString(),
      name: newFloorName,
      image: newFloorImage,
      nodes: []
    };

    setFloors([...floors, newFloor]);
    setActiveFloorId(newFloor.id);
    setNewFloorName('');
    setNewFloorImage(null);
    setIsAddFloorOpen(false);
  };

  // Delete Current Active Floor
  const handleDeleteFloor = (floorId) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا الدور وكل النقاط المسجلة فيه؟')) {
      const updatedFloors = floors.filter(f => f.id !== floorId);
      setFloors(updatedFloors);
      setActiveFloorId(updatedFloors.length > 0 ? updatedFloors[0].id : null);
      setSelectedNode(null);
      setPathSourceNode(null);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewFloorImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas Click Handler (Add Node / Connect Path)
  const handleCanvasClick = (e) => {
    if (!activeFloor) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    if (mode === 'addNode') {
      const newNode = {
        id: `node_${Date.now()}`,
        name: `نقطة ${activeFloor.nodes.length + 1}`,
        x,
        y,
        floorId: activeFloor.id,
        adjacencyList: []
      };

      const updatedFloors = floors.map(floor => {
        if (floor.id === activeFloor.id) {
          return { ...floor, nodes: [...floor.nodes, newNode] };
        }
        return floor;
      });

      setFloors(updatedFloors);
      setSelectedNode(newNode);
    } else if (mode === 'select') {
      setSelectedNode(null);
    }
  };

  // Handle Node Click
  const handleNodeClick = (node, e) => {
    e.stopPropagation();

    if (mode === 'createPath') {
      if (!pathSourceNode) {
        setPathSourceNode(node);
      } else if (pathSourceNode.id !== node.id) {
        // Calculate Distance / Weight
        const dx = pathSourceNode.x - node.x;
        const dy = pathSourceNode.y - node.y;
        const weight = Math.round(Math.sqrt(dx * dx + dy * dy) / 10);

        const updatedFloors = floors.map(floor => {
          if (floor.id === activeFloor.id) {
            const updatedNodes = floor.nodes.map(n => {
              if (n.id === pathSourceNode.id) {
                const exists = n.adjacencyList.some(a => a.nodeId === node.id);
                if (!exists) {
                  return { ...n, adjacencyList: [...n.adjacencyList, { nodeId: node.id, weight }] };
                }
              }
              if (n.id === node.id) {
                const exists = n.adjacencyList.some(a => a.nodeId === pathSourceNode.id);
                if (!exists) {
                  return { ...n, adjacencyList: [...n.adjacencyList, { nodeId: pathSourceNode.id, weight }] };
                }
              }
              return n;
            });
            return { ...floor, nodes: updatedNodes };
          }
          return floor;
        });

        setFloors(updatedFloors);
        setPathSourceNode(null);
      }
    } else {
      setSelectedNode(node);
    }
  };

  // Delete Node
  const handleDeleteNode = (nodeId) => {
    const updatedFloors = floors.map(floor => {
      if (floor.id === activeFloor.id) {
        const filteredNodes = floor.nodes
          .filter(n => n.id !== nodeId)
          .map(n => ({
            ...n,
            adjacencyList: n.adjacencyList.filter(a => a.nodeId !== nodeId)
          }));
        return { ...floor, nodes: filteredNodes };
      }
      return floor;
    });

    setFloors(updatedFloors);
    setSelectedNode(null);
  };

  // Build Final JSON Schema
  const getExportData = () => {
    const allNodes = floors.flatMap(f => f.nodes);
    return {
      buildingName,
      floors: floors.map(f => ({ id: f.id, name: f.name, image: f.image })),
      nodes: allNodes
    };
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 dir-rtl font-sans">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Building className="w-6 h-6 text-emerald-400" />
          <input 
            type="text" 
            value={buildingName} 
            onChange={(e) => setBuildingName(e.target.value)}
            className="bg-slate-800 text-slate-100 px-3 py-1.5 rounded-lg border border-slate-700 text-lg font-bold focus:outline-none focus:border-emerald-500"
            placeholder="اسم المبنى / الكلية"
          />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsJsonModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold transition border border-slate-700"
          >
            <Download className="w-4 h-4" />
            معاينة / تصدير JSON
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Control Panel / Canvas */}
        <div className="flex-1 flex flex-col relative bg-slate-950 p-4">
          {/* Top Toolbar */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded-2xl mb-4 shadow-lg z-10">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => { setMode('select'); setPathSourceNode(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${mode === 'select' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <MousePointer className="w-4 h-4" />
                تحديد / تحريك
              </button>

              <button 
                onClick={() => { setMode('addNode'); setPathSourceNode(null); }}
                disabled={!activeFloor}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${mode === 'addNode' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 disabled:opacity-40'}`}
              >
                <Plus className="w-4 h-4" />
                إضافة نقطة (Add Node)
              </button>

              <button 
                onClick={() => { setMode('createPath'); setPathSourceNode(null); }}
                disabled={!activeFloor || activeFloor.nodes.length < 2}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${mode === 'createPath' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 disabled:opacity-40'}`}
              >
                <Share2 className="w-4 h-4" />
                توصيل مسار (Create Path)
              </button>
            </div>

            {mode === 'createPath' && pathSourceNode && (
              <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-lg">
                حدد النقطة الثانية للتوصيل بـ: <strong>{pathSourceNode.name}</strong>
              </span>
            )}
          </div>

          {/* Interactive Canvas Area */}
          <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-900/50 rounded-2xl border border-slate-800/80 relative">
            {!activeFloor ? (
              <div className="text-center p-8 max-w-md">
                <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-slate-300 mb-2">لا توجد خريطة مضافة بعد</h3>
                <p className="text-slate-500 text-sm mb-6">قم بإنشاء دور جديد ورفع صورة الخريطة الخاصة به للبدء في تحديد النقاط والمسارات.</p>
                <button 
                  onClick={() => setIsAddFloorOpen(true)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/30 transition"
                >
                  إضافة دور وخريطة جديدة
                </button>
              </div>
            ) : (
              <div 
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="relative inline-block cursor-crosshair select-none"
              >
                {/* Floor Map Image */}
                <img 
                  ref={imageRef}
                  src={activeFloor.image} 
                  alt={activeFloor.name}
                  className="max-w-none rounded-lg shadow-2xl pointer-events-none"
                />

                {/* Draw Path Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {activeFloor.nodes.map(node => 
                    node.adjacencyList.map(adj => {
                      const targetNode = activeFloor.nodes.find(n => n.id === adj.nodeId);
                      if (!targetNode) return null;
                      return (
                        <line 
                          key={`${node.id}-${adj.nodeId}`}
                          x1={node.x}
                          y1={node.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray="4"
                        />
                      );
                    })
                  )}
                </svg>

                {/* Render Nodes (Green Circles) */}
                {activeFloor.nodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const isPathSource = pathSourceNode?.id === node.id;

                  return (
                    <div
                      key={node.id}
                      onClick={(e) => handleNodeClick(node, e)}
                      style={{ left: `${node.x}px`, top: `${node.y}px` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 ${
                        isPathSource 
                          ? 'bg-amber-500 border-white text-slate-950 animate-pulse' 
                          : isSelected 
                            ? 'bg-emerald-400 border-white text-slate-950 ring-4 ring-emerald-500/30' 
                            : 'bg-emerald-600 border-slate-900 text-white'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-950/80 border border-slate-800 text-slate-200 text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                        {node.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col p-4 gap-6">
          {/* Floors Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <Layers className="w-4 h-4" /> أدوار المبنى ({floors.length})
              </span>
              <button 
                onClick={() => setIsAddFloorOpen(true)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" /> إضافة دور
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {floors.map(floor => (
                <div 
                  key={floor.id} 
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                    activeFloorId === floor.id 
                      ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400' 
                      : 'bg-slate-800/50 border-transparent hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  <button
                    onClick={() => { setActiveFloorId(floor.id); setSelectedNode(null); }}
                    className="flex-1 text-right text-xs font-semibold flex items-center justify-between pl-2"
                  >
                    <span>{floor.name}</span>
                    <span className="bg-slate-950 px-2 py-0.5 rounded text-[10px] text-slate-500">
                      {floor.nodes.length} نقطة
                    </span>
                  </button>
                  <button 
                    onClick={() => handleDeleteFloor(floor.id)}
                    title="حذف الدور"
                    className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Node Details */}
          <div className="flex-1 flex flex-col bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4">
            <h4 className="text-sm font-bold text-slate-300 mb-4 pb-2 border-b border-slate-800">
              بيانات النقطة المختارة
            </h4>

            {selectedNode ? (
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">اسم النقطة / المكان:</label>
                  <input 
                    type="text" 
                    value={selectedNode.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      const updatedFloors = floors.map(f => {
                        if (f.id === activeFloor.id) {
                          return {
                            ...f,
                            nodes: f.nodes.map(n => n.id === selectedNode.id ? { ...n, name: newName } : n)
                          };
                        }
                        return f;
                      });
                      setFloors(updatedFloors);
                      setSelectedNode({ ...selectedNode, name: newName });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">الإحداثي X:</span>
                    <span className="text-emerald-400 font-mono font-bold">{selectedNode.x}px</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block">الإحداثي Y:</span>
                    <span className="text-emerald-400 font-mono font-bold">{selectedNode.y}px</span>
                  </div>
                </div>

                {/* Adjacency List */}
                <div className="flex-1 flex flex-col">
                  <span className="text-xs text-slate-500 block mb-2">المسارات المتصلة بها:</span>
                  <div className="flex-1 overflow-y-auto space-y-2">
                    {selectedNode.adjacencyList.length === 0 ? (
                      <span className="text-[11px] text-slate-600 block">لا توجد مسارات متصلة لهذه النقطة بعد.</span>
                    ) : (
                      selectedNode.adjacencyList.map(adj => {
                        const target = activeFloor.nodes.find(n => n.id === adj.nodeId);
                        return (
                          <div key={adj.nodeId} className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-xl text-xs border border-slate-800">
                            <span className="text-slate-300">{target?.name || adj.nodeId}</span>
                            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                              الوزن: {adj.weight}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition mt-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" /> حذف النقطة
                </button>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-xs text-slate-600">
                اختر نقطة من الخريطة لمعاينة وتعديل خصائصها.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Add New Floor */}
      {isAddFloorOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleAddFloor} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-200">إضافة دور وخريطة جديدة</h3>
              <button type="button" onClick={() => setIsAddFloorOpen(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">اسم الدور:</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: الدور الأول، الدور الأرضي..."
                  value={newFloorName}
                  onChange={(e) => setNewFloorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">صورة الخريطة:</label>
                <input 
                  type="file" 
                  accept="image/*"
                  required
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                />
              </div>

              {newFloorImage && (
                <div className="mt-2 relative rounded-xl overflow-hidden border border-slate-800 max-h-40">
                  <img src={newFloorImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => setIsAddFloorOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-400 hover:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                إلغاء
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-900/40"
              >
                إضافة الدور
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Export JSON */}
      {isJsonModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-200">بيانات الخريطة (JSON Schema)</h3>
              <button onClick={() => setIsJsonModalOpen(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-400 text-xs font-mono overflow-auto max-h-96 dir-ltr">
              {JSON.stringify(getExportData(), null, 2)}
            </pre>

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(getExportData(), null, 2));
                  alert('تم نسخ الـ JSON بنجاح!');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                نسخ الـ JSON
              </button>
              <button 
                onClick={() => setIsJsonModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapCreator;