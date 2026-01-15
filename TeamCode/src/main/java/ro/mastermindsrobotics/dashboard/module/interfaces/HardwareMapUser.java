package ro.mastermindsrobotics.dashboard.module.interfaces;

import com.qualcomm.robotcore.hardware.HardwareMap;

import java.util.function.Supplier;

public interface HardwareMapUser {
    void setHardwareMap(Supplier<HardwareMap> map);
}
