/**
 * Renovate Bot Configuration for UYR-DOCTORS
 * 
 * This configuration manages automated dependency updates across
 * the UYR-DOCTORS organization repositories.
 */

module.exports = {
  // Branch prefix for Renovate PRs
  branchPrefix: 'renovate/',
  
  // Bot identity
  username: 'renovate-bot',
  gitAuthor: 'Renovate Bot <bot@renovateapp.com>',
  
  // Skip onboarding PR (set to true if you want an initial onboarding PR)
  onboarding: false,
  
  // Platform configuration
  platform: 'github',
  
  // Repositories to manage (add all repos you want Renovate to monitor)
  repositories: [
    'UYR-DOCTORS/UYR-WEB-INFRA',
    // Add more repositories here:
    // 'UYR-DOCTORS/another-repo',
  ],
  
  // Schedule: Run outside business hours
  schedule: [
    'after 10pm every weekday',
    'before 5am every weekday',
    'every weekend',
  ],
  
  // Limit concurrent PRs to avoid overwhelming reviewers
  prConcurrentLimit: 5,
  
  // Group updates by type for easier review
  packageRules: [
    {
      // Group all Terraform provider updates
      matchDatasources: ['terraform-provider'],
      groupName: 'Terraform providers',
      automerge: false,
    },
    {
      // Group all Terraform module updates
      matchDatasources: ['terraform-module'],
      groupName: 'Terraform modules',
      automerge: false,
    },
    {
      // Group GitHub Actions updates
      matchManagers: ['github-actions'],
      groupName: 'GitHub Actions',
      automerge: false,
    },
    {
      // Auto-merge patch updates for non-critical dependencies
      matchUpdateTypes: ['patch'],
      matchPackagePatterns: ['*'],
      automerge: false, // Set to true if you want auto-merge for patches
      automergeType: 'pr',
    },
  ],
  
  // Renovate will respect existing lock files
  rangeStrategy: 'auto',
  
  // Add labels to PRs for easier filtering
  labels: ['dependencies', 'renovate'],
  
  // Assign reviewers (optional - uncomment and set your team/users)
  // assignees: ['@UYR-DOCTORS/devops-team'],
  // reviewers: ['@UYR-DOCTORS/devops-team'],
  
  // Vulnerability alerts - create PR immediately
  vulnerabilityAlerts: {
    enabled: true,
    labels: ['security'],
    assignees: ['@UYR-DOCTORS/security-team'], // Update with your team
  },
  
  // Timezone for schedule
  timezone: 'Europe/London', // Adjust to your timezone
  
  // Increase PR description details
  prBodyTemplate: '{{{header}}}{{{table}}}{{{notes}}}{{{changelogs}}}{{{controls}}}',
  
  // Host rules for private packages (uncomment and configure if needed)
  // hostRules: [
  //   {
  //     // For private GitHub packages
  //     hostType: 'npm', // or 'maven', 'nuget', etc.
  //     matchHost: 'npm.pkg.github.com',
  //     username: 'x-access-token',
  //     password: process.env.RENOVATE_TOKEN,
  //   },
  // ],
  
  // Enable Terraform/Terragrunt support
  terraform: {
    enabled: true,
  },
  
  // Ignore specific dependencies (add as needed)
  ignoreDeps: [
    // Example: 'terraform-provider-aws',
  ],
  
  // Ignore specific paths
  ignorePaths: [
    '**/node_modules/**',
    '**/bower_components/**',
    '**/.terragrunt-cache/**',
  ],
};
