import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';

export const devtoolsTabs = [
    {
        label: 'Node.js',
        content: (
            <CodeContent
                code={
                    '# Install Node.js 18+ and npm\ncurl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -\nsudo apt-get install -y nodejs\n\n# Install gRPC packages\nnpm install @grpc/grpc-js @grpc/proto-loader\n\n# Install additional utilities\nnpm install axios lodash'
                }
            />
        ),
    },
    {
        label: 'Python',
        content: (
            <CodeContent
                code={`# Install Python 3.8+ and pip
sudo apt-get update
sudo apt-get install python3 python3-pip

# Install gRPC packages
pip3 install grpcio grpcio-tools protobuf

# Install additional utilities
pip3 install asyncio aiofiles pycryptodome`}
            />
        ),
    },
    {
        label: 'Rust',
        content: (
            <CodeContent
                code={`# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Install Tari from source (optional)
git clone https://github.com/tari-project/tari.git
cd tari
cargo build --release`}
            />
        ),
    },
    {
        label: 'PHP',
        content: (
            <CodeContent
                code={`# Install PHP 8.0+ and Composer
sudo apt-get install php8.0 php8.0-cli php8.0-mbstring composer

# Install gRPC extension
sudo apt-get install php8.0-grpc

# Install Protobuf tools
composer require google/protobuf spiral/php-grpc`}
            />
        ),
    },
    {
        label: 'grpcurl',
        content: (
            <CodeContent
                code={`# Install grpcurl (essential for testing)

# Linux
curl -L https://github.com/fullstorydev/grpcurl/releases/download/v1.8.7/grpcurl_1.8.7_linux_x86_64.tar.gz | tar -xz
sudo mv grpcurl /usr/local/bin/

# macOS
brew install grpcurl

# Windows (using chocolatey)
choco install grpcurl

# Test installation
grpcurl --version

# Test Tari connection (once services are running)
grpcurl -plaintext localhost:18142 list
grpcurl -plaintext localhost:18143 list`}
            />
        ),
    },
];
