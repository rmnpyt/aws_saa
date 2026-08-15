import { Search } from 'lucide-react'

const serviceCategories = [
  {
    name: 'Analytics',
    services: [
      { name: 'Amazon Athena', desc: 'Serverless SQL queries directly on S3 data using Presto.' },
      { name: 'Amazon EMR', desc: 'Managed Hadoop/Spark cluster for big data processing.' },
      { name: 'AWS Glue', desc: 'Serverless ETL service — crawlers, jobs, and Data Catalog.' },
      { name: 'Amazon Kinesis', desc: 'Real-time streaming data ingestion and processing.' },
      { name: 'AWS Lake Formation', desc: 'Build, secure, and manage data lakes on S3.' },
      { name: 'Amazon MSK', desc: 'Managed Apache Kafka for streaming.' },
      { name: 'Amazon OpenSearch', desc: 'Managed search and log analytics (formerly Elasticsearch).' },
      { name: 'Amazon QuickSight', desc: 'BI and visualization service, pay-per-session.' },
      { name: 'Amazon Redshift', desc: 'Columnar data warehouse for PB-scale analytics.' },
    ]
  },
  {
    name: 'Application Integration',
    services: [
      { name: 'Amazon EventBridge', desc: 'Serverless event bus — connects applications via events.' },
      { name: 'Amazon MQ', desc: 'Managed ActiveMQ/RabbitMQ for migrating message brokers.' },
      { name: 'Amazon SNS', desc: 'Push-based pub/sub messaging — topics and subscriptions.' },
      { name: 'Amazon SQS', desc: 'Pull-based message queuing — Standard and FIFO queues.' },
      { name: 'AWS Step Functions', desc: 'Visual workflow orchestration for distributed apps.' },
    ]
  },
  {
    name: 'Compute',
    services: [
      { name: 'AWS Batch', desc: 'Managed batch computing — dynamically provisions EC2/Fargate.' },
      { name: 'Amazon EC2', desc: 'Virtual servers in the cloud. The core compute service.' },
      { name: 'Amazon EC2 Auto Scaling', desc: 'Automatically scale EC2 capacity based on demand.' },
      { name: 'AWS Elastic Beanstalk', desc: 'PaaS — deploy apps without managing infrastructure.' },
      { name: 'AWS Fargate', desc: 'Serverless container compute — no cluster management.' },
      { name: 'AWS Lambda', desc: 'Serverless functions — run code without servers, pay per invocation.' },
      { name: 'AWS Outposts', desc: 'AWS infrastructure deployed on-premises.' },
    ]
  },
  {
    name: 'Containers',
    services: [
      { name: 'Amazon ECR', desc: 'Managed Docker container image registry.' },
      { name: 'Amazon ECS', desc: 'Managed container orchestration. Supports EC2 and Fargate launch types.' },
      { name: 'Amazon EKS', desc: 'Managed Kubernetes service.' },
    ]
  },
  {
    name: 'Database',
    services: [
      { name: 'Amazon Aurora', desc: 'MySQL/PostgreSQL-compatible, 5× faster than standard RDS. Multi-AZ by default.' },
      { name: 'Amazon DynamoDB', desc: 'Fully managed NoSQL key-value and document database. Single-digit ms latency at any scale.' },
      { name: 'Amazon ElastiCache', desc: 'In-memory caching — Redis (complex) or Memcached (simple).' },
      { name: 'Amazon Neptune', desc: 'Managed graph database for relationship-heavy data.' },
      { name: 'Amazon RDS', desc: 'Managed relational databases — MySQL, PostgreSQL, Oracle, SQL Server, MariaDB.' },
      { name: 'Amazon Redshift', desc: 'Data warehouse — also listed in Analytics.' },
    ]
  },
  {
    name: 'Networking & Content Delivery',
    services: [
      { name: 'Amazon CloudFront', desc: 'CDN — low-latency delivery of content via global edge locations.' },
      { name: 'AWS Direct Connect', desc: 'Dedicated, private 1–100 Gbps connection from on-premises to AWS.' },
      { name: 'Elastic Load Balancing', desc: 'ALB (L7/HTTP), NLB (L4/TCP), GLB (L3/4 for inline appliances).' },
      { name: 'AWS Global Accelerator', desc: 'Routes traffic over AWS backbone for improved global latency. Anycast IPs.' },
      { name: 'AWS PrivateLink', desc: 'Private connectivity between VPCs and services without internet.' },
      { name: 'Amazon Route 53', desc: 'Scalable DNS with health checks and traffic routing policies.' },
      { name: 'AWS Transit Gateway', desc: 'Central hub for connecting VPCs and on-premises networks.' },
      { name: 'Amazon VPC', desc: 'Isolated virtual network — subnets, route tables, IGW, NAT, security groups, NACLs.' },
      { name: 'AWS WAF', desc: 'Web Application Firewall — blocks SQLi, XSS, and custom rules.' },
    ]
  },
  {
    name: 'Security, Identity & Compliance',
    services: [
      { name: 'AWS ACM', desc: 'Free SSL/TLS certificates for AWS services. Auto-renewal.' },
      { name: 'AWS CloudHSM', desc: 'Hardware Security Module — customer-managed keys, FIPS 140-2 Level 3.' },
      { name: 'Amazon Cognito', desc: 'User authentication — User Pools (auth) and Identity Pools (federation).' },
      { name: 'Amazon GuardDuty', desc: 'Threat detection via ML — analyzes CloudTrail, VPC Flow Logs, DNS logs.' },
      { name: 'IAM', desc: 'Users, groups, roles, and policies. The foundation of AWS access control.' },
      { name: 'AWS IAM Identity Center', desc: 'Centralized SSO for multiple AWS accounts and apps.' },
      { name: 'Amazon Inspector', desc: 'Vulnerability scanning for EC2 instances and container images.' },
      { name: 'AWS KMS', desc: 'Managed encryption keys. Integrates with virtually all AWS services.' },
      { name: 'Amazon Macie', desc: 'ML-powered S3 data discovery — finds and protects sensitive data (PII, credentials).' },
      { name: 'AWS Secrets Manager', desc: 'Stores, rotates, and retrieves secrets. Automatic rotation for RDS, Redshift.' },
      { name: 'AWS Shield', desc: 'DDoS protection — Standard (free, automatic) and Advanced (managed, $3K/mo).' },
    ]
  },
  {
    name: 'Storage',
    services: [
      { name: 'AWS Backup', desc: 'Centralized backup across AWS services — automated backup plans.' },
      { name: 'Amazon EBS', desc: 'Block storage for EC2. Types: gp3, io2, st1, sc1. Single AZ.' },
      { name: 'Amazon EFS', desc: 'Managed NFS — shared file storage for Linux, scales automatically.' },
      { name: 'Amazon FSx', desc: 'Managed file systems — Windows (SMB), Lustre (HPC), NetApp ONTAP, OpenZFS.' },
      { name: 'Amazon S3', desc: 'Object storage — 99.999999999% durability. Storage classes from Standard to Glacier Deep Archive.' },
      { name: 'Amazon S3 Glacier', desc: 'Long-term archival storage. Retrieval: Instant, Flexible (minutes-hours), Deep Archive (12h).' },
      { name: 'AWS Storage Gateway', desc: 'Hybrid storage — extends on-prem storage to S3. Types: File, Volume, Tape.' },
    ]
  },
]

export const metadata = { title: 'AWS Services Reference' }

export default function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">AWS Services Reference</h1>
        <p className="text-slate-500">Quick-reference guide for all in-scope SAA-C03 services, organized by category.</p>
      </div>

      <div className="space-y-8">
        {serviceCategories.map(cat => (
          <div key={cat.name}>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 pb-2 border-b">{cat.name}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {cat.services.map(svc => (
                <div key={svc.name} className="rounded-lg border bg-white dark:bg-slate-800 p-3.5">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white mb-0.5">{svc.name}</p>
                  <p className="text-xs text-slate-500">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
