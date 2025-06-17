import CodeContent from '@/ui-shared/components/CodeContent/CodeContent';
import CodeHighlight from '@/ui-shared/components/CodeContent/CodeHighlight';

export const multilayerSecurityArchitecture = [
    {
        label: 'Security Architecture',
        content: (
            <CodeHighlight title="🧠 Security Implementation Logic">
                <CodeContent
                    code={`FUNCTION implementSecurityMeasures():
    // Layer 1: Network Security
    configureFirewall([
        "ALLOW 18141/tcp FROM trusted_peers",
        "ALLOW 18142/tcp FROM localhost ONLY",
        "ALLOW 18143/tcp FROM localhost ONLY", 
        "DENY ALL other traffic"
    ])
    
    // Layer 2: Authentication & Authorization
    implementMFA({
        admin_accounts: "hardware_tokens_required",
        operator_accounts: "totp_required",
        api_access: "jwt_with_refresh_rotation"
    })
    
    // Layer 3: Wallet Security
    separateWallets({
        hot_wallet: {
            balance_limit: "1% of total funds",
            withdrawal_limit: "daily_maximum",
            monitoring: "real_time"
        },
        cold_storage: {
            air_gapped: true,
            multi_signature: "3_of_5_scheme",
            hardware_security_module: true
        }
    })
    
    // Layer 4: Data Protection
    encryptSensitiveData({
        keys: "AES-256-GCM",
        database: "TDE_enabled",
        backups: "encrypted_at_rest",
        transmission: "TLS_1.3_minimum"
    })
    
    // Layer 5: Monitoring & Alerting
    implementMonitoring({
        failed_logins: "immediate_alert_after_3",
        large_withdrawals: "manual_approval_required",
        unusual_patterns: "ML_based_detection",
        system_health: "24_7_monitoring"
    })
    
    RETURN security_status`}
                />
            </CodeHighlight>
        ),
    },
    {
        label: 'Access Control',
        content: (
            <CodeContent
                code={`# Role-Based Access Control (RBAC) Configuration

## Admin Role (Full Access)
- Wallet management
- System configuration  
- User account management
- Financial controls
- Security settings

## Operator Role (Limited Access)
- Transaction monitoring
- Customer support
- Basic reporting
- Limited withdrawal approval

## Auditor Role (Read-Only)
- Transaction history
- System logs
- Compliance reports
- Security audit trails

## API Service Account
- Programmatic access only
- Rate limited
- IP restricted
- Specific endpoint permissions

# Implementation Example
sudo groupadd tari-admins
sudo groupadd tari-operators
sudo groupadd tari-auditors

# Configure sudo access
echo '%tari-admins ALL=(ALL) ALL' > /etc/sudoers.d/tari-admins
echo '%tari-operators ALL=(tari) NOPASSWD: /usr/local/bin/tari-operator-tools' > /etc/sudoers.d/tari-operators`}
            />
        ),
    },
    {
        label: 'Security Monitoring',
        content: (
            <CodeContent
                code={`# Security Monitoring Implementation

## File Integrity Monitoring
sudo apt-get install aide
sudo aideinit
sudo aide --check

## Log Monitoring with ELK Stack
version: '3.7'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=true
    
  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    
  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200

## Real-time Alerting Rules
input {
  file {
    path => "/var/log/tari/*.log"
    type => "tari"
  }
}

filter {
  if [type] == "tari" {
    if "FAILED_LOGIN" in [message] {
      mutate { add_tag => [ "security_alert" ] }
    }
    if "LARGE_WITHDRAWAL" in [message] {
      mutate { add_tag => [ "financial_alert" ] }
    }
  }
}

output {
  if "security_alert" in [tags] {
    http {
      url => "https://alerts.yourexchange.com/webhook"
      http_method => "post"
    }
  }
}`}
            />
        ),
    },
    {
        label: 'Incident Response',
        content: (
            <CodeContent
                code={`# Incident Response Procedures

## Immediate Response (0-15 minutes)
1. Identify incident type
2. Activate incident response team
3. Isolate affected systems
4. Preserve evidence

## Assessment Phase (15-60 minutes)
1. Determine scope of breach
2. Assess fund security
3. Check system integrity
4. Document timeline

## Containment (1-4 hours)
1. Stop unauthorized access
2. Patch vulnerabilities
3. Reset compromised credentials
4. Secure backup systems

## Recovery (4-24 hours)
1. Restore from clean backups
2. Verify system integrity
3. Resume operations gradually
4. Monitor for reoccurrence

## Post-Incident (24+ hours)
1. Conduct thorough investigation
2. Update security measures
3. Report to authorities if required
4. Communicate with stakeholders

# Emergency Contacts
SECURITY_TEAM="security@yourexchange.com"
CEO_PHONE="+1-555-0123"
CTO_PHONE="+1-555-0124"
LEGAL_COUNSEL="+1-555-0125"

# Automated Incident Response
#!/bin/bash
# incident-response.sh

INCIDENT_TYPE=$1
SEVERITY=$2

case $INCIDENT_TYPE in
  "unauthorized_access")
    # Immediately disable compromised accounts
    ./disable-accounts.sh --compromised
    # Alert security team
    ./send-alert.sh "SECURITY BREACH DETECTED" $SEVERITY
    ;;
  "large_withdrawal")
    # Freeze withdrawal processing
    ./freeze-withdrawals.sh
    # Require manual approval
    ./require-manual-approval.sh
    ;;
  "system_compromise")
    # Isolate affected systems
    ./isolate-systems.sh
    # Contact incident response team
    ./emergency-contact.sh
    ;;
esac`}
            />
        ),
    },
];
