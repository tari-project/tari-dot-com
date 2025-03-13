export enum Os {
    Mac = 'mac',
    Windows = 'windows',
    Linux = 'linux',
}

export enum Network {
    Mainnet = 'mainnet',
    Nextnet = 'nextnet',
    Testnet = 'testnet',
}

export enum MacArch {
    Arm64 = 'arm64',
    X86_64 = 'x86_64',
}

export enum WindowsArch {
    X64 = 'x64',
    X86 = 'x86',
}

export enum LinuxArch {
    Arm64 = 'arm64',
    X86_64 = 'x86_64',
}

export type MacArchType = MacArch.Arm64 | MacArch.X86_64;
export type WindowsArchType = WindowsArch.X64 | WindowsArch.X86;
export type LinuxArchType = LinuxArch.Arm64 | LinuxArch.X86_64;

export type ArchMapType = {
    [Os.Mac]: MacArchType;
    [Os.Windows]: WindowsArchType;
    [Os.Linux]: LinuxArchType;
};

export interface DownloadOptionsType<OS extends Os> {
    os: OS;
    architecture: ArchMapType[OS];
    network: Network;
}
