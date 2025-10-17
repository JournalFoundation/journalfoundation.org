---
rfc: 1
title: "Cypherlot Core Protocol"
status: "Draft"
date: 2025-01-15
authors: ["John Benac"]
abstract: "This document specifies the core Cypherlot protocol, including encryption requirements, capability-based sharing, and discovery mechanisms."
---

> **Status:** Draft  
> **Conventions:** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" are to be interpreted as described by BCP 14. Informative notes are explicitly labeled and are non-normative.

## Status of This Memo

This document is a Draft RFC and may be updated, replaced, or obsoleted by other documents at any time.

## Abstract

A Cypherlot is a personal, encrypted data node that enables sovereignty over digital information through capability-based sharing and metadata minimization. This specification defines the core protocol requirements.

## 1. Introduction

### 1.1 Motivation

**Decentralization alone is insufficient for digital sovereignty.**

Existing decentralized systems (Mastodon, Diaspora, ActivityPub) solve the centralization problem but create new vulnerabilities:

- **Metadata exposure:** Federation protocols reveal who talks to whom
- **Instance admin surveillance:** Server operators see all user activity  
- **Traffic correlation:** Network observers can build social graphs
- **Bulk seizure:** Encrypted data can be downloaded and stored for future decryption
- **Quantum threat:** Post-quantum computers will retroactively decrypt today's traffic

**Cypherlots provides anonymization, not just decentralization:**

- **Metadata minimization:** Blind relays that can't see message contents or routing
- **Traffic obfuscation:** OHTTP prevents correlation of communication patterns
- **Selective disclosure:** Capability-based sharing prevents bulk data exfiltration
- **Forward secrecy:** Cryptographic ratcheting makes old data unrecoverable
- **No identity registry:** Decentralized capabilities eliminate central correlation points

### 1.2 Threat Model

Cypherlots defends against:

1. **Platform surveillance** (Facebook, Google model)
2. **Federation surveillance** (Mastodon admin model)  
3. **Metadata correlation** (NSA bulk collection model)
4. **Bulk seizure + quantum decryption** (China problem)
5. **Traffic analysis** (Tor adversary model)

Cypherlots does NOT defend against:

- Compromised end-user devices
- Physical coercion with key disclosure
- Real-time MITM if user accepts bad certificates
- Social engineering attacks

### 1.3 Requirements

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

## 2. Architecture

### 2.1 Core Components

A Cypherlot consists of:

- **Vault**: Encrypted storage backend
- **Capability Manager**: Grant/revoke access tokens
- **Discovery Service**: Optional mesh networking
- **Relay**: Optional metadata-blind proxy

### 2.2 Encryption Requirements

All data MUST be encrypted at rest using AES-256-GCM or equivalent. Encryption keys MUST be derived from user-controlled secrets.

## 3. Capability-Based Sharing

### 3.1 Capability Tokens

Access grants are represented as capability tokens that encode:

- Resource identifier
- Scope (read, write, admin)
- Expiration time
- Revocation nonce

### 3.2 Token Format

```
capability := HMAC-SHA256(secret, scope || resource || exp || nonce)
```

## 4. Security Considerations

### 4.1 Threat Model

Cypherlots defend against:

- Platform surveillance
- Metadata correlation
- Third-party tracking
- Coerced disclosure (via plausible deniability)

### 4.2 Limitations

Cypherlots do NOT protect against:

- Compromised client devices
- Physical coercion with key disclosure
- Traffic analysis at network layer (without relay)

## 5. References

- [RFC 2119] Key words for use in RFCs to Indicate Requirement Levels
- [libp2p] Modular network stack documentation