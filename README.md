# Code Scanning a GitHub repo using Azure Pipelines

## Use Case

See full walkthrough blog post: [sam.hope-evans.com/code-scanning-a-github-repo-using-azure-pipelines/](https://sam.hope-evans.com/code-scanning-a-github-repo-using-azure-pipelines/)

This repo will show how you can host your code in GitHub and use an Azure DevOps (ADO) pipeline to run [GitHub Advanced Security CodeQL scans](https://github.com/features/security/code) and return the results back to the GitHub interface. 

![CodeQL-AzurePipelines](https://user-images.githubusercontent.com/19208973/201486114-e0024835-2aeb-4547-beee-349a9287887f.png)

### Requirements

- GitHub Repo: public or private (needs GitHub Advanced Security enabled)
- [Azure DevOps project](https://dev.azure.com/samhope-evans/code-scanning-ado/): YML pipeline created
- [GitHub PaT token](https://docs.github.com/en/code-security/code-scanning/using-codeql-code-scanning-with-your-existing-ci-system/installing-codeql-cli-in-your-ci-system#generating-a-token-for-authentication-with-github): (repo & security events scope) saved as an ADO pipeline variable
- [Azure Pipelines GitHub app](https://github.com/marketplace/azure-pipelines): to allow ADO access to the GitHub repo

### Overview

This repo has a simple Node JS App which uses an [ADO pipeline](https://dev.azure.com/samhope-evans/code-scanning-ado/) run the CodeQL scan.

[![Build Status](https://dev.azure.com/samhope-evans/code-scanning-ado/_apis/build/status/futuredesignUK.code-scanning-ado?branchName=main)](https://dev.azure.com/samhope-evans/code-scanning-ado/_build/latest?definitionId=21&branchName=main)

The ADO pipeline uses the CodeQL API to:

- Download the latest CodeQL bundle for the detected OS
- Detect the languages of a given repository to determine which ones are supported by CodeQL
- Create CodeQL databases, analyze, and upload results back to GitHub for each supported language

#### GitHub security tab

In GitHub you can now see the [security scan results](https://github.com/futuredesignUK/code-scanning-ado/security/code-scanning) and also the [current status of CodeQL](https://github.com/futuredesignUK/code-scanning-ado/security/code-scanning/tool-status/CodeQL).

![image](https://user-images.githubusercontent.com/19208973/209973064-a862b9e1-2d46-413b-9779-5ef1e868de7d.png)


### Credit

Based on this [blog post by Kevin Alwell](https://github.blog/2020-10-27-code-scanning-a-github-repository-using-github-advanced-security-within-an-azure-devops-pipeline/).

The [CodeQL runner is now deprecated](https://docs.github.com/en/code-security/code-scanning/using-codeql-code-scanning-with-your-existing-ci-system/running-codeql-runner-in-your-ci-system).

So adapted the Azure pipeline using [David Wiggs's CodeQL Anywhere repo](https://github.com/david-wiggs/codeql-anywhere).


