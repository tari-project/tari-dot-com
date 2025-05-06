use tari_comms::CommsBuilder;

#[tokio_macros::main]
async fn main() {
  // Load a node identity from a file.
  // The NodeIdentity struct contains the node's public/private key pair and publicly-accessible
  // address.
  let node_identity = load_node_identity();
  let storage = setup_peer_storage();

  let comms = CommsBuilder::new()
    // Allow peers to use localhost as their address for testing purposes
    .enable_test_addresses()
    // The transport to use
    .with_transport(TcpTransport::default())
    // The address to listen for peer connections
    .with_listener_address("/ip4/127.0.0.1/tcp/8080".parse().unwrap())
    // Set the identity of this node.
    // This is used to authenticate via the noise protocol and when identity information is exchanged
    .with_node_identity(node_identity)
    // Set the peer list storage backend
    .with_peer_storage(storage)
    .build()
    .expect("Failed to build comms");

  // The comms components are built, there may be some things you want to setup here before
  // spawning the node

  // Channel for outgoing messages. Send messages (`OutboundMessage`) on outbound_tx, and the messaging protocol will
  // do it's best to send them to the correct peer in the peer list
  let (_outbound_tx, outbound_rx) = mpsc::channel(10);
  // Channel for incoming messages.
  // Read `InboundMessage`s off the inbound_rx stream.
  let (inbound_tx, _inbound_rx) = mpsc::channel(10);

  let comms_node = comms
      // Setup a messaging pipeline. This provides pipelines for incoming and outgoing messages. This is optional.
      // You could add [tower services](https://docs.rs/tower-service/0.3.0/tower_service/trait.Service.html) (kind of like middleware) to
      // process all incoming and outgoing messages.
      .with_messaging_pipeline(
         pipeline::Builder::new()
            // Outbound messages will be forwarded "as is" to outbound messaging
            .with_outbound_pipeline(outbound_rx, std::convert::identity)
            .max_concurrent_inbound_tasks(1)
            // Inbound messages will be forwarded "as is" to inbound_tx
            .with_inbound_pipeline(SinkService::new(inbound_tx))
            .finish(),
    )
    .spawn()
    .await
    .expect("Failed to spawn comms");

  do_things_with_comms(&comms_node).await;

  // Shut everything down when done
  comms_node.shutdown().await;
}
