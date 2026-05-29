from pydantic import BaseModel, Field
from typing import List, Literal, Optional, Dict, Any

class UIAction(BaseModel):
    action_type: Literal["trigger_forecast", "filter_data", "toggle_view"]
    target_endpoint: str = Field(..., description="API route to call when user interacts")
    payload_mapping: Dict[str, str] = Field(..., description="Maps component internal values to API params")

class DashboardComponent(BaseModel):
    component_type: Literal["MetricCard", "LineChart", "InteractiveSlider", "GridContainer"]
    component_id: str = Field(..., description="Unique slug for identifying this specific component")
    title: Optional[str] = None
    width_ratio: Literal["full", "half", "third"] = "full"
    props: Dict[str, Any] = Field(default_factory=dict, description="Values like labels, colors, min/max bounds")
    on_change: Optional[UIAction] = None
    children: Optional[List['DashboardComponent']] = None

class DashboardLayout(BaseModel):
    layout_id: str
    explanation_of_design: str = Field(..., description="The reasoning behind choosing this specific layout")
    components: List[DashboardComponent]

# This allows components to nest inside other components (like items inside a Grid)
DashboardComponent.model_rebuild()