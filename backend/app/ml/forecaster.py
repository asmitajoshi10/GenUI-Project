import torch
import numpy as np
from chronos import ChronosPipeline

class MLSimulationEngine:
    def __init__(self):
        print("🤖 Loading Deep Learning Forecasting Model (Amazon Chronos)...")
        # We use the mini version so it runs fast and efficiently on your machine
        self.pipeline = ChronosPipeline.from_pretrained(
            "amazon/chronos-t5-mini",
            device_map="cpu",  # Ensures compatibility across all Windows setups
            torch_dtype=torch.float32
        )
        print("✅ Model loaded successfully!")

    def run_inference(self, context_data: list, prediction_length: int, pricing_multiplier: float = 1.0) -> dict:
        """
        Takes raw data, adjusts it based on user sliders (pricing_multiplier),
        and runs it through the deep learning model to forecast future trends.
        """
        # 1. Simulate the impact of the user's slider changes on the raw data
        modified_context = np.array(context_data) * pricing_multiplier
        
        # 2. Convert data to a PyTorch Tensor (Chronos model input format)
        context_tensor = torch.tensor(modified_context, dtype=torch.float32).unsqueeze(0)
        
        # 3. Run the Deep Learning prediction model
        with torch.no_grad():
            forecast = self.pipeline.predict(context_tensor, prediction_length)
        
        # 4. Extract data distributions (Median, Low bound 10%, High bound 90%)
        # Chronos outputs multiple statistical trajectories; we extract key percentiles
        forecast_samples = forecast[0].numpy()
        low = np.percentile(forecast_samples, 10, axis=0)
        median = np.percentile(forecast_samples, 50, axis=0)
        high = np.percentile(forecast_samples, 90, axis=0)
        
        return {
            "p10": low.tolist(),
            "p50": median.tolist(),
            "p90": high.tolist()
        }

# Instantiate a single global machine learning engine
ml_engine = MLSimulationEngine()