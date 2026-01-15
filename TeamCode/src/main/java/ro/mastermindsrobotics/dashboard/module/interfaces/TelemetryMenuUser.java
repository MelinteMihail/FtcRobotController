package ro.mastermindsrobotics.dashboard.module.interfaces;

import java.util.function.Supplier;

import ro.mastermindsrobotics.dashboard.module.TelemetryMenu;

public interface TelemetryMenuUser {
    void setTelemetryMenu(Supplier<TelemetryMenu> telemetryMenu);
}
