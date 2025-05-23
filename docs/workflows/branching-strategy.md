# Branching Strategy and CI/CD Pipeline

This document provides a visual representation of our Git branching strategy and CI/CD pipeline.

## Branching Strategy Diagram

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base', 'gitGraph': {'showBranches': true, 'showCommitLabel':true,'mainBranchName': 'production'}} }%%
gitGraph
   commit id: "Initial commit"
   branch develop
   checkout develop
   commit id: "Setup project structure"
   commit id: "Add core components"

   branch feature/aws-localstack
   checkout feature/aws-localstack
   commit id: "Add LocalStack configuration"
   commit id: "Implement mock AWS services"
   commit id: "Add documentation"
   checkout develop
   merge feature/aws-localstack id: "Merge LocalStack setup"

   branch feature/aws-cloud-deployment
   checkout feature/aws-cloud-deployment
   commit id: "Add CloudFormation templates"
   commit id: "Configure AWS services"
   commit id: "Add deployment scripts"
   checkout develop
   merge feature/aws-cloud-deployment id: "Merge AWS deployment"

   branch feature/user-auth
   checkout feature/user-auth
   commit id: "Implement user authentication"
   commit id: "Add login/signup forms"
   checkout develop
   merge feature/user-auth id: "Merge user authentication"

   checkout production
   merge develop id: "Release v1.0.0" tag: "v1.0.0"

   checkout develop
   branch fix/login-issue
   checkout fix/login-issue
   commit id: "Fix login validation"
   checkout develop
   merge fix/login-issue id: "Fix login issue"

   checkout production
   merge develop id: "Release v1.0.1" tag: "v1.0.1"
```

## CI/CD Pipeline Diagram

```mermaid
flowchart TD
    A[Developer commits code] --> B[GitHub Actions triggered]
    B --> C{Run tests}
    C -->|Tests pass| D[Build application]
    C -->|Tests fail| E[Notify developer]
    E --> A
    D --> F{Branch?}
    F -->|feature/*| G[Deploy to dev environment]
    F -->|develop| H[Deploy to staging environment]
    F -->|production| I[Request approval]
    I --> J{Approved?}
    J -->|Yes| K[Deploy to production]
    J -->|No| L[Notify team]
    L --> A
    G --> M[Run integration tests]
    H --> N[Run E2E tests]
    K --> O[Run smoke tests]
    M --> P{Tests pass?}
    N --> P
    O --> P
    P -->|Yes| Q[Mark as successful]
    P -->|No| R[Rollback and notify]
    R --> A
```

## Pull Request Workflow

```mermaid
sequenceDiagram
    participant D as Developer
    participant F as Feature Branch
    participant CI as CI/CD Pipeline
    participant R as Reviewer
    participant Dev as Develop Branch
    participant P as Production Branch

    D->>F: Create feature branch
    D->>F: Commit changes
    D->>F: Push to remote
    D->>CI: Create pull request
    CI->>CI: Run automated tests
    CI->>R: Request review
    R->>CI: Review code
    R->>CI: Request changes (if needed)
    D->>F: Address feedback
    R->>CI: Approve changes
    CI->>Dev: Merge to develop
    CI->>CI: Deploy to staging
    CI->>CI: Run integration tests
    CI->>P: Create PR to production
    CI->>CI: Request approval
    CI->>P: Merge to production
    CI->>CI: Deploy to production
```

## Deployment Environments

```mermaid
flowchart LR
    subgraph Local
        A[Developer Machine]
        B[LocalStack]
    end

    subgraph AWS Cloud
        subgraph Development
            C[Dev Environment]
        end

        subgraph Staging
            D[Staging Environment]
        end

        subgraph Production
            E[Production Environment]
        end
    end

    A --> B
    A --> C
    C --> D
    D --> E
```

## Branch Protection Rules

```mermaid
flowchart TD
    subgraph Production Branch
        A[Require pull request reviews]
        B[Require status checks to pass]
        C[Require linear history]
        D[Include administrators]
        E[Restrict who can push]
    end

    subgraph Develop Branch
        F[Require pull request reviews]
        G[Require status checks to pass]
        H[Require linear history]
        I[Include administrators]
    end

    subgraph Feature Branches
        J[No restrictions]
    end
```

## Rollback Process

```mermaid
flowchart TD
    A[Deployment failure detected] --> B{Critical issue?}
    B -->|Yes| C[Immediate rollback]
    B -->|No| D[Assess impact]
    D --> E{Requires rollback?}
    E -->|Yes| C
    E -->|No| F[Create fix branch]
    C --> G[Verify rollback successful]
    G --> F
    F --> H[Implement fix]
    H --> I[Create PR]
    I --> J[Review and merge]
    J --> K[Deploy fix]
```

These diagrams provide a visual representation of our branching strategy, CI/CD pipeline, and related workflows. They should be used as a reference for all team members to understand the development and deployment processes.