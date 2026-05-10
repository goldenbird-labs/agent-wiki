export interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

export interface Policy {
  id: string;
  title: string;
  version: string;
  effectiveDate: string;
  owner: string;
  summary: string;
  sections: PolicySection[];
}

export const policies: Policy[] = [
  {
    id: 'POL-001',
    title: 'AI Agent Registration & Governance Policy',
    version: '1.2',
    effectiveDate: '2026-01-01',
    owner: 'AI Governance Committee',
    summary: 'All AI agents operating within the organization must be formally registered, assessed, and approved before deployment to any production or customer-facing environment.',
    sections: [
      {
        id: 'POL-001-S1',
        title: 'Scope',
        content: [
          'This policy applies to all AI agents, including large language model (LLM)-based systems, autonomous workflows, and co-pilot tools deployed by any team or business unit.',
          'Third-party AI tools integrated into internal systems are also in scope if they process organizational or customer data.',
        ],
      },
      {
        id: 'POL-001-S2',
        title: 'Registration Requirements',
        content: [
          'Every agent must be registered in the AI Agent Wiki before production use. Registration requires: agent name, business owner, department, intended use case, model and vendor, data access scope, and risk classification.',
          'Unregistered agents may not process personal data, financial records, or proprietary business information.',
          'Registration must be renewed annually or upon any material change to the agent\'s purpose or data access.',
        ],
      },
      {
        id: 'POL-001-S3',
        title: 'Approval Process',
        content: [
          'Low-risk agents require department head approval and a brief self-assessment.',
          'Medium-risk agents require AI Governance Committee review within 10 business days.',
          'High-risk agents require a full impact assessment, legal review, and executive sponsor sign-off before deployment.',
        ],
      },
    ],
  },
  {
    id: 'POL-002',
    title: 'Responsible AI Use Policy',
    version: '2.0',
    effectiveDate: '2026-01-01',
    owner: 'Chief AI Officer',
    summary: 'This policy establishes the principles and rules for responsible, ethical, and safe use of AI systems across the organization.',
    sections: [
      {
        id: 'POL-002-S1',
        title: 'Core Principles',
        content: [
          'Human Oversight: AI agents must not make final decisions on matters with significant human impact (employment, credit, healthcare, legal) without human review and accountability.',
          'Transparency: Users interacting with AI agents must be informed they are engaging with an AI system.',
          'Fairness: AI outputs must be monitored for discriminatory patterns. Agents exhibiting bias must be suspended pending investigation.',
          'Data Minimization: Agents must only access the minimum data necessary to fulfill their function.',
        ],
      },
      {
        id: 'POL-002-S2',
        title: 'Prohibited Uses',
        content: [
          'AI agents must not be used to surveil, manipulate, or make decisions about employees without their knowledge.',
          'Generating synthetic media (deepfakes, voice clones) of real individuals without explicit consent is prohibited.',
          'Agents must not be configured to deceive users about their AI nature or to impersonate specific human individuals.',
          'Use of AI to circumvent existing compliance, legal, or security controls is a disciplinary matter.',
        ],
      },
      {
        id: 'POL-002-S3',
        title: 'Incident Reporting',
        content: [
          'Any employee who observes an AI agent producing harmful, biased, or inappropriate output must report it to ai-safety@company.com within 24 hours.',
          'Critical incidents (data leakage, regulatory breach, safety harm) must be escalated immediately to the CISO and Chief AI Officer.',
        ],
      },
    ],
  },
  {
    id: 'POL-003',
    title: 'AI Data Handling & Privacy Policy',
    version: '1.0',
    effectiveDate: '2026-02-01',
    owner: 'Data Protection Officer',
    summary: 'Defines how AI agents may collect, process, store, and retain data, in alignment with GDPR, CCPA, and internal data governance standards.',
    sections: [
      {
        id: 'POL-003-S1',
        title: 'Data Classification & Access',
        content: [
          'AI agents must be granted the minimum data access required for their designated function. Access is reviewed quarterly.',
          'Agents must not be connected to personal data stores without a Privacy Impact Assessment (PIA) and DPO sign-off.',
          'Sensitive data categories (health, financial, biometric, political affiliation) require elevated approval regardless of agent risk tier.',
        ],
      },
      {
        id: 'POL-003-S2',
        title: 'Data Retention',
        content: [
          'Conversation logs and agent inputs/outputs must be retained for a minimum of 90 days for audit purposes.',
          'Retention beyond 12 months requires documented business justification and legal review.',
          'Agents must not persist personal data beyond their operational window unless explicitly authorized.',
        ],
      },
      {
        id: 'POL-003-S3',
        title: 'Vendor & Model Provider Obligations',
        content: [
          'All LLM providers must sign a Data Processing Agreement (DPA) before organizational data is sent to their APIs.',
          'Prompt data sent to external model APIs must not include unredacted PII, unless covered by a Business Associate Agreement or equivalent.',
          'Model providers must certify they do not train on customer prompt data without opt-in consent.',
        ],
      },
    ],
  },
  {
    id: 'POL-004',
    title: 'AI Agent Monitoring & Audit Policy',
    version: '1.1',
    effectiveDate: '2026-01-15',
    owner: 'AI Governance Committee',
    summary: 'Establishes minimum standards for ongoing monitoring, performance evaluation, and audit of deployed AI agents.',
    sections: [
      {
        id: 'POL-004-S1',
        title: 'Monitoring Requirements',
        content: [
          'All active agents must be monitored for output quality, latency, error rate, and policy compliance on an ongoing basis.',
          'High-risk agents must have real-time alerting configured for anomalous behavior patterns.',
          'Monitoring dashboards must be accessible to the agent owner and AI Governance Committee at all times.',
        ],
      },
      {
        id: 'POL-004-S2',
        title: 'Audit Cadence',
        content: [
          'Low-risk agents: annual audit.',
          'Medium-risk agents: semi-annual audit.',
          'High-risk agents: quarterly audit plus event-triggered review after any significant incident.',
          'Audits must include: output sampling, bias testing, data access review, and drift assessment.',
        ],
      },
      {
        id: 'POL-004-S3',
        title: 'Deprecation & Decommissioning',
        content: [
          'Agents that fail audit or are no longer actively maintained must be moved to "Under Review" status within 5 business days.',
          'Decommissioned agents must have their data access revoked and API credentials rotated immediately.',
          'A 30-day notice must be given to affected business units before an agent is deprecated.',
        ],
      },
    ],
  },
];
