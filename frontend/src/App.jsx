import React, { useState } from "react";
import { 
  DollarSign, 
  Percent, 
  TrendingUp, 
  RotateCcw, 
  Sparkles 
} from "lucide-react";
import { 
  LineChart as ReChartsLine, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState(null);
  const [forecastData, setForecastData] = useState([
    { step: "Jan", value: 100 },
    { step: "Feb", value: 120 },
    { step: "Mar", value: 145 },
    { step: "Apr", value: 130 },
    { step: "May", value: 165 },
    { step: "Jun", value: 190 },
  ]);
  const [sliderVal, setSliderVal] = useState(1.0);

  // 1. Core Generator Pipeline
  const assembleDashboard = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/generate-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setLayout(data);
    } catch (err) {
      console.error("Layout assembly error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Deep Learning Simulation Pipeline
  const handleSliderChange = async (e) => {
    const val = parseFloat(e.target.value);
    setSliderVal(val);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/simulate-forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ multiplier: val }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setForecastData(data.forecast);
      }
    } catch (err) {
      console.error("Simulation error:", err);
    }
  };

  // 3. Reset Button Action
  const resetDashboard = () => {
    setPrompt("");
    setLayout(null);
    setSliderVal(1.0);
    setForecastData([
      { step: "Jan", value: 100 },
      { step: "Feb", value: 120 },
      { step: "Mar", value: 145 },
      { step: "Apr", value: 130 },
      { step: "May", value: 165 },
      { step: "Jun", value: 190 },
    ]);
  };

  // Icon Mapping Helper
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "DollarSign": return <DollarSign className="w-5 h-5 text-stone-700" />;
      case "Percent": return <Percent className="w-5 h-5 text-stone-700" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-stone-700" />;
      default: return <Sparkles className="w-5 h-5 text-stone-700" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Input Controls Panel */}
        <div className="bg-[#F4F0E6] border border-stone-200 rounded-xl p-4 flex gap-3 shadow-sm">
          <input
            type="text"
            className="flex-1 bg-white border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400 text-stone-800"
            placeholder="Describe the dashboard layout you want..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={assembleDashboard}
            disabled={loading}
            className="bg-stone-800 hover:bg-stone-700 text-[#FDFBF7] font-medium px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? "Assembling..." : "Assemble Dashboard"}
          </button>
          
          {/* New Reset Button */}
          <button
            onClick={resetDashboard}
            className="border border-stone-300 hover:bg-stone-200 bg-white text-stone-700 font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition"
            title="Reset Dashboard"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Generative UI Output Canvas */}
        {layout && (
          <div className="space-y-6">
            {/* Agent Architecture Logic Banner */}
            <div className="bg-[#EFEAE0] border-l-4 border-stone-500 rounded-r-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-stone-700 font-bold uppercase tracking-wider text-xs mb-1">
                <Sparkles className="w-4 h-4" /> Agent Architecture Logic
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                {layout.explanation_of_design}
              </p>
            </div>

            {/* Dynamic Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {layout.components?.map((component) => {
                
                if (component.type === "MetricCard") {
                  return (
                    <div key={component.id} className="bg-white border border-stone-200 rounded-xl p-6 flex justify-between items-center shadow-sm">
                      <div>
                        <p className="text-stone-500 text-sm font-medium mb-1">{component.props.title}</p>
                        <h3 className="text-3xl font-bold text-stone-800">{component.props.value}</h3>
                      </div>
                      <div className="bg-[#F4F0E6] p-3 rounded-xl">
                        {renderIcon(component.props.icon)}
                      </div>
                    </div>
                  );
                }

                if (component.type === "InteractiveSlider") {
                  return (
                    <div key={component.id} className="bg-white border border-stone-200 rounded-xl p-6 md:col-span-2 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <label className="font-semibold text-stone-700">{component.props.label}</label>
                        <span className="text-stone-800 font-bold bg-[#F4F0E6] px-3 py-1 rounded-full text-sm">
                          {Math.round(sliderVal * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={component.props.min_value || 0.5}
                        max={component.props.max_value || 2.0}
                        step="0.1"
                        value={sliderVal}
                        onChange={handleSliderChange}
                        className="w-full accent-stone-700 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  );
                }

                if (component.type === "LineChart") {
                  return (
                    <div key={component.id} className="bg-white border border-stone-200 rounded-xl p-6 md:col-span-2 shadow-sm">
                      <h4 className="font-bold text-stone-800 mb-4">{component.props.title}</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReChartsLine data={forecastData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#EFEAE0" />
                            <XAxis dataKey="step" stroke="#78716c" />
                            <YAxis stroke="#78716c" />
                            <Tooltip contentStyle={{ backgroundColor: '#F4F0E6', border: '1px solid #d6d3d1' }} />
                            <Line type="monotone" dataKey="value" stroke="#44403c" strokeWidth={3} dot={{ fill: '#44403c' }} />
                          </ReChartsLine>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
