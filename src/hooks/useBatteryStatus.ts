import { useState, useEffect } from "react";

interface BatteryStatus {
  isLowBattery: boolean;
  batteryLevel: number | null;
  isCharging: boolean;
}

/**
 * Custom hook to detect battery status
 * Returns whether the device is on low battery (< 30%) and not charging
 */
export const useBatteryStatus = (): BatteryStatus => {
  const [isLowBattery, setIsLowBattery] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // Check if Battery Status API is supported
    if (!("getBattery" in navigator)) {
      return;
    }

    let battery: any;

    const updateBatteryStatus = (batteryObj: any) => {
      const level = batteryObj.level;
      const charging = batteryObj.charging;

      setBatteryLevel(level);
      setIsCharging(charging);

      // Consider low battery ONLY if level < 30% AND not charging
      setIsLowBattery(level < 0.3 && !charging);
    };

    // Get battery status
    (navigator as any).getBattery().then((batteryObj: any) => {
      battery = batteryObj;

      // Initial update
      updateBatteryStatus(battery);

      // Listen for changes
      const onLevelChange = () => updateBatteryStatus(battery);
      const onChargingChange = () => updateBatteryStatus(battery);

      battery.addEventListener("levelchange", onLevelChange);
      battery.addEventListener("chargingchange", onChargingChange);

      // Cleanup
      return () => {
        battery.removeEventListener("levelchange", onLevelChange);
        battery.removeEventListener("chargingchange", onChargingChange);
      };
    });
  }, []);

  return { isLowBattery, batteryLevel, isCharging };
};
