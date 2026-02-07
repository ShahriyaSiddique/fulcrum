export type BaseConfig = {
    serviceName: string;
    env: "development" | "test" | "production";
};

export function loadBaseConfig(serviceName: string): BaseConfig {
    return {
        serviceName,
        env: (process.env.NODE_ENV as BaseConfig["env"]) ?? "development",
    };
}
