# FEATURE LEAKAGE AUDIT — MeghDrishti Platform

## Explicit Leakage Check Criteria

| Check Description | Audit Finding | Status |
| :--- | :--- | :--- |
| **Observation Target Leakage** | Feature columns explicitly exclude `observed_rainfall`, `observed_temperature`, `observed_wind`. | **PASSED (0 Leakage)** |
| **Future Forecast / Observation Leakage** | Predictions for `valid_time` only use NWP inputs issued on or before `issue_time = valid_time - lead_days`. | **PASSED (0 Leakage)** |
| **Temporal Splitting Rigor** | Chronological splitting: Train (2023-01 to 2024-05), Validation (2024-06 to 2024-11), Test (2024-12 to 2025-06). Never random K-Fold on time-series. | **PASSED (Strict Time-Series)** |
| **Climatology & Historical Error Features** | `hist_rain_bias` and `hist_temp_bias` calculated **strictly from training set rows only**. Test set statistics are never accessed. | **PASSED (No Leakage)** |
| **Preprocessing Scalers** | Standard scaler parameters (mean, standard deviation) fitted solely on `X_train` and saved to `preprocessing.json`. | **PASSED** |

**Conclusion:** The MeghDrishti training pipeline is 100% free of target leakage, future leakage, and preprocessing contamination.
