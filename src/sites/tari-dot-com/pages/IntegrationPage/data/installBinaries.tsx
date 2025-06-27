import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';

export const installBinariesTabs = [
    {
        label: 'Linux',
        content: (
            <CodeContent
                code={`# Download latest release
curl -L # PLACEHOLDER: Replace with actual Tari Linux download URL
curl -L https://github.com/tari-project/tari/releases/latest/download/minotari-linux.tar.gz -o minotari.tar.gz

# Extract
tar -xzf minotari.tar.gz

# Move to system path
sudo mv minotari/* /usr/local/bin/

# Verify installation
minotari_node --version`}
            />
        ),
    },
    {
        label: 'macOS',
        content: (
            <CodeContent
                code={`# Download latest release
curl -L # PLACEHOLDER: Replace with actual Tari macOS download URL
curl -L https://github.com/tari-project/tari/releases/latest/download/minotari-macos.dmg -o minotari.dmg

# Mount and install
hdiutil attach minotari.dmg
cp -R /Volumes/Minotari/minotari_* /usr/local/bin/

# Verify installation
minotari_node --version`}
            />
        ),
    },
    {
        label: 'Windows',
        content: (
            <CodeContent
                code={`# Download from https://tari.com/downloads/
# Run the installer executable
# Or use PowerShell:

Invoke-WebRequest -Uri "# PLACEHOLDER: Replace with actual Tari Windows download URL
Invoke-WebRequest -Uri "https://github.com/tari-project/tari/releases/latest/download/minotari-windows.exe"" -OutFile "minotari-installer.exe"
.\minotari-installer.exe

# Verify installation
minotari_node.exe --version`}
            />
        ),
    },
];
