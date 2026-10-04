# DATA AUDIT REPORT — MeghDrishti Weather Intelligence

## 1. Attached Datasets Inventory

| Filename | Path | Rows | Columns | Date Range | Geographic Coverage | Unique Panchayats | Districts | States | Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`forecasts_raw.csv`** | `data_raw/forecasts_raw.csv` | 59,280 | 14 | 2023-01-01 to 2025-06-30 | Maharashtra, Karnataka, Telangana (13 Panchayats) | 13 | 10 | 3 | Open-Meteo NWP ECMWF IFS Coarse Multi-Lead Run |
| **`observations_raw.csv`** | `data_raw/observations_raw.csv` | 11,856 | 10 | 2023-01-01 to 2025-06-30 | Maharashtra, Karnataka, Telangana (13 Panchayats) | 13 | 10 | 3 | IMD Gridded Daily Archive Reference |
| **`panchayats_master.csv`** | `data_raw/panchayats_master.csv` | 13 | 22 | Static GIS / DEM | Maharashtra, Karnataka, Telangana | 13 | 10 | 3 | Survey of India / LGD Directory & ISRO Bhuvan / Soil Health Portal Reference |

---

## 2. Actual Dataset Variables & Data Generating Process

### Forecast Inputs (`forecasts_raw.csv`):
- `forecast_rainfall`: Coarse NWP precipitation sum in mm.
- `forecast_temperature_max`: Maximum daily temperature in °C.
- `forecast_temperature_min`: Minimum daily temperature in °C.
- `forecast_temperature`: Mean temperature in °C.
- `forecast_wind`: Maximum wind speed in km/h.
- `forecast_rain_probability`: Coarse rain probability.
- `issue_time`: Timestamp when NWP model was initialized (00:00:00).
- `valid_time`: Prediction valid target date (00:00:00).
- `lead_days`: Horizon difference (1 to 5 days).

### Observation Targets (`observations_raw.csv`):
- `observed_rainfall`: Ground-truth observed precipitation in mm (Target: $y_{rain}$).
- `observed_temperature`: Daily mean observed temperature in °C (Target: $y_{temp}$).
- `observed_wind`: Daily maximum wind speed in km/h.

### Geographic & Soil Features (`panchayats_master.csv`):
- `latitude`, `longitude`: Spatial coordinates.
- `elevation_m`: Elevation above sea level (m asl) ranging from 275m (Warangal basin) to 950m (Sakleshpur Ghats).
- `slope_deg`, `aspect_deg`: Micro-topographic terrain slope and solar orientation.
- `cropland_frac`, `forest_frac`, `builtup_frac`, `water_frac`: Land cover fractions.
- `soil_clay_pct`, `soil_sand_pct`, `soil_silt_pct`, `soil_ph`, `soil_organic_carbon_pct`: Soil health characteristics.
