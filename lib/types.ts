export interface Panchayat {
  lgd_code: string;
  panchayat_name: string;
  village_name: string;
  taluka: string;
  district: string;
  state: string;
  zone: string;
  latitude: number;
  longitude: number;
  elevation_m: number;
  slope_deg: number;
  aspect_deg: number;
  cropland_frac: number;
  forest_frac: number;
  builtup_frac: number;
  soil_clay_pct: number;
  soil_type: string;
  latest_rainfall_estimate: number;
  latest_baseline_rainfall: number;
  latest_temp_estimate: number;
  latest_rain_prob: number;
  latest_range: [number, number];
  trust_label: "High" | "Medium" | "Low" | string;
  trust_score: number;
  trust_reason: string;
}

export interface PredictionResult {
  lgd_code: string;
  panchayat_name: string;
  village_name: string;
  taluka: string;
  district: string;
  state: string;
  zone: string;
  lead_days: number;
  estimate: number;
  range: [number, number];
  rain_prob: number;
  rain_category: string;
  trust: "High" | "Medium" | "Low" | string;
  trust_score: number;
  trust_reason: string;
  baseline: number;
  baseline_temp: number;
  corrected_temp: number;
  humidity_proxy: number;
  wind_kmh: number;
  elevation_m: number;
  model_version: string;
}

export interface CropAdvisory {
  crop: string;
  stage: string;
  panchayat_name: string;
  lgd_code: string;
  language: string;
  forecast_rainfall_mm: number;
  rain_probability: number;
  trust_level: string;
  recommended_action: string;
  why: string;
  disclaimer: string;
  spray_window?: string;
  spray_status?: "AVOID" | "CAUTION" | "SAFE" | string;
  irrigation_advice?: string;
  irrigation_status?: "STOP" | "IRRIGATE" | string;
  fertilizer_advice?: string;
  pest_alert?: string;
  pest_remedy?: string;
}

export interface ForecastHistoryItem {
  date: string;
  observed_rainfall: number;
  baseline_rainfall: number;
  corrected_rainfall: number;
  range_low: number;
  range_high: number;
  observed_temperature: number;
  baseline_temperature: number;
  corrected_temperature: number;
  rain_probability: number;
}

export interface ModelComparisonItem {
  model: string;
  target: string;
  zone: string;
  lead_time: string;
  season: string;
  MAE: number | null;
  RMSE: number | null;
  bias: number | null;
  correlation: number | null;
  POD: number | null;
  FAR: number | null;
  CSI: number | null;
  Brier: number | null;
  sample_count: number;
  training_time_sec: number;
  status: string;
}

export interface ScorecardItem {
  zone: string;
  lead_days: number;
  season: string;
  sample_count: number;
  baseline_mae_mm: number;
  model_mae_mm: number;
  mae_diff_mm: number;
  skill_score: number;
  baseline_rmse_mm: number;
  model_rmse_mm: number;
  status: string;
}

export interface ModelHealth {
  model_version: string;
  last_trained: string;
  training_records: number;
  validation_records: number;
  test_records: number;
  panchayat_count: number;
  model_type: string;
  data_coverage: string;
  data_quality: string;
  historical_skill: string;
  station_density: string;
  status: string;
  system_operational: boolean;
}
