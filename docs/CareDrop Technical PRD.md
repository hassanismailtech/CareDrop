# **Product Requirements Document (PRD): CareDrop**

**Document Owner:** Senior Technical Product Manager  
**Target Release:** MVP (V1.0)  
**Date:** July 2026

## **1\. Executive Summary**

**Overview:** CareDrop is an on-demand, mobile-first medicine delivery platform operating in Nigeria. It bridges the gap between patients and licensed pharmacies by enabling users to seamlessly search for authentic medications, compare prices, upload prescriptions, and receive secure, fast doorstep delivery.  
**Business Goals:** \* Capture 15% of the digital pharmacy delivery market in major Nigerian metropolitan areas within the first 12 months.

* Establish a verified network of 500+ licensed pharmacies to ensure 100% authentic medication distribution.  
* Achieve an average order fulfilment (click-to-door) time of under 90 minutes.

**Vision:** To become Nigeria's most trusted digital health ecosystem for accessing authentic medicines quickly, safely, and conveniently, ultimately expanding to comprehensive digital healthcare services.

## **2\. Problem Statement**

Patients in Nigeria face critical friction points in accessing essential medications:

* **Availability & Discovery:** Lack of inventory visibility means patients often visit 3-4 pharmacies to find specific or rare medications.  
* **Authenticity:** High prevalence of counterfeit or substandard drugs in the open market, causing severe health risks.  
* **Logistical Friction:** Heavy traffic, long queues, and limited access for elderly, pregnant, or chronically ill patients.  
* **Prescription Bottlenecks:** Fulfilling prescription-only medication online is currently fragmented and lacks regulatory compliance tools.

## **3\. User Personas**

### **Persona 1: "The Caregiver" (Amina, 34, Working Mother)**

* **Role:** Primary healthcare decision-maker for her children and ageing parents.  
* **Goals:** Needs fast, reliable access to genuine medications without leaving her home or office. Wants to compare prices to manage her budget.  
* **Frustrations:** Wasting hours in Lagos traffic looking for specific pediatric antibiotics; fear of buying fake malaria pills.

### **Persona 2: "The Pharmacy Partner" (Dr Ade, 45, Pharmacy Owner)**

* **Role:** Licensed pharmacist operating an independent neighbourhood pharmacy.  
* **Goals:** Increase daily sales volume, digitise his inventory, and reach customers beyond his physical storefront.  
* **Frustrations:** Staff spending too much time on phone inquiries regarding drug availability; high operational costs for self-managed delivery.

## **4\. Goals & Non-Goals**

**Goals (In-Scope for MVP):**

* End-to-end user ordering flow (Search, Cart, Checkout, Payment).  
* Prescription upload and pharmacist verification workflow.  
* Partner portal for pharmacies to manage inventory and approve/reject orders.  
* Dedicated Rider App for order assignment, routing, and real-time GPS tracking.  
* Comprehensive Admin Dashboard for platform oversight and analytics.

**Non-Goals (Out of Scope for MVP):**

* Telemedicine (Doctor/Pharmacist video consultations).  
* Health Insurance (HMO) integrations.  
* AI Health Assistant, voice search, and medication reminders.  
* Subscription/recurring medicine orders.  
* Laboratory booking and international delivery.

## **5\. Success Metrics (KPIs)**

* **Business Metrics:** \* Gross Merchandise Value (GMV) per month.  
  * Customer Acquisition Cost (CAC) vs. Customer Lifetime Value (CLTV).  
  * Pharmacy Onboarding Rate (Target: 50/month).  
* **User/Operational Metrics:**  
  * Average Order Value (AOV).  
  * Order Fulfilment Time (Target: \< 90 mins).  
  * Prescription Verification Time (Target: \< 10 mins).  
  * Delivery Success Rate (Target: \> 98%).  
* **Technical Metrics:**  
  * App Crash Rate (\< 1%).  
  * API Response Time (p95 \< 200ms).

## **6\. User Stories & Acceptance Criteria**

**Epic: Prescription Management**

* **User Story:** As a patient, I want to upload an image of my prescription during checkout so that I can legally purchase restricted medicines.  
  * **Acceptance Criteria:**  
    * *Given* a user adds a "Prescription Required" drug to their cart.  
    * *When* they proceed to checkout, the system mandates an image/PDF upload.  
    * *Given* a successful upload, the order is placed in a "Pending Verification" state until a pharmacist approves it.

**Epic: Order Fulfilment**

* **User Story:** As a pharmacist, I want to review uploaded prescriptions so that I can approve or reject them based on medical validity.  
  * **Acceptance Criteria:**  
    * *Given* a new prescription order arrives, *when* the pharmacist clicks "Reject", they must select a reason (e.g., "Illegible", "Expired"), and the user is instantly notified, triggering an automated refund.

**Epic: Logistics**

* **User Story:** As a rider, I want to see the exact pickup and drop-off locations so that I can deliver the medicine efficiently.  
  * **Acceptance Criteria:**  
    * *Given* a rider accepts an order, *when* they view the order details, they see a map integration with route optimisation and buttons to call the pharmacy/customer.

## **7\. Functional Requirements**

* **Authentication Module:** Phone number/OTP login (Firebase Auth) and Google OAuth.  
* **Search & Discovery Engine:** Elasticsearch or Algolia integration to handle fuzzy matching for complex medical terms, filtering by category (e.g., Diabetes, Pregnancy) and sorting by price/proximity.  
* **Cart & Checkout Logic:** Dynamic delivery fee calculation based on geofence distance between patient and pharmacy.  
* **Payment Gateway:** Integration with Paystack/Flutterwave for Card, Bank Transfer, and Wallet payments. Escrow logic holds funds until delivery is complete.  
* **Real-time Notifications:** WebSockets/Push notifications for state changes (Order Placed \-\> Pharmacy Accepted \-\> Rider Assigned \-\> Picked Up \-\> Delivered).

## **8\. Technical Architecture & Data Model**

### **Tech Stack**

* **Client Apps (Patient & Rider):** React Native (Expo) \- chosen for fast cross-platform deployment and offline capability via AsyncStorage.  
* **Web Portals (Pharmacy & Admin):** React.js \+ Tailwind CSS.  
* **Backend:** Node.js with NestJS framework (TypeScript for strict typing of medical data).  
* **Database:** PostgreSQL (Relational integrity for orders/payments) \+ Redis (Real-time rider location tracking and session caching).  
* **Infrastructure:** AWS (EKS for container orchestration, RDS for Postgres, S3 for prescription image storage).  
* **Integrations:** Paystack (Payments), Google Maps/Places API (Routing/Geocoding), Twilio/Termii (SMS/OTP).

### **High-Level Data Model (Relational Schema)**

**1\. Users Table**

* id (UUID, PK)  
* role (Enum: PATIENT, RIDER, PHARMACY\_ADMIN, SUPER\_ADMIN)  
* phone\_number (String, Unique)  
* email (String, Unique)  
* password\_hash (String)  
* is\_verified (Boolean)

**2\. Pharmacies Table**

* id (UUID, PK)  
* user\_id (UUID, FK \-\> users)  
* name (String)  
* license\_number (String, Unique)  
* latitude/longitude (Decimal)  
* status (Enum: ACTIVE, INACTIVE, SUSPENDED)

**3\. Medicines Table (Global Catalogue)**

* id (UUID, PK)  
* generic\_name (String)  
* brand\_name (String)  
* category\_id (UUID, FK)  
* requires\_prescription (Boolean)  
* image\_url (String)

**4\. Pharmacy\_inventory Table**

* pharmacy\_id (UUID, FK \-\> pharmacies)  
* medicine\_id (UUID, FK \-\> medicines)  
* price (Decimal)  
* stock\_count (Integer)  
* *Primary Key: (pharmacy\_id, medicine\_id)*

**5\. Orders Table**

* id (UUID, PK)  
* patient\_id (UUID, FK \-\> users)  
* pharmacy\_id (UUID, FK \-\> pharmacies)  
* rider\_id (UUID, Nullable FK \-\> users)  
* status (Enum: PENDING, PHARMACY\_REVIEW, PREPARING, RIDER\_ASSIGNED, IN\_TRANSIT, DELIVERED, CANCELLED)  
* prescription\_url (String, Nullable)  
* subtotal / delivery\_fee / total (Decimal)

**6\. Payments Table**

* id (UUID, PK)  
* order\_id (UUID, FK \-\> orders)  
* reference\_code (String, Unique from Gateway)  
* status (Enum: SUCCESS, FAILED, PENDING, REFUNDED)

## **9\. Constraints & Assumptions**

* **Constraints:**  
  * **Regulatory Compliance:** Must strictly adhere to PCN (Pharmacists Council of Nigeria) guidelines regarding the sale and transport of Rx (prescription) medications.  
  * **Network Reliability:** Cellular networks in Nigeria can be unstable; rider and patient apps must handle intermittent connectivity gracefully (optimistic UI updates, request queuing).  
  * **Device Limitations:** A significant portion of the user base will use low-end Android devices. The React Native app bundle must be optimised to \< 20MB.  
* **Assumptions:**  
  * Pharmacies will have a dedicated tablet or laptop with stable internet to monitor the Pharmacy Dashboard.  
  * Riders own smartphones with functioning GPS modules.

## **10\. Open Questions & Risks**

* **Risk 1: Fraudulent Prescriptions.**  
  * *Mitigation:* Pharmacies assume legal liability for verification. Implement an internal "Trust Score" for users. Future iterations will integrate directly with EMRs/Hospitals.  
* **Risk 2: Rider Availability during Peak/Rainy Hours.**  
  * *Mitigation:* Implement a dynamic delivery fee (surge pricing) logic to incentivise riders during extreme weather or high demand.  
* **Risk 3: Inventory Synchronisation.**  
  * *Known Unknown:* How often do pharmacies update their physical stock? If a user orders a drug that is actually out of stock, the UX degrades.  
  * *Mitigation:* The "Accept Order" step in the Pharmacy dashboard acts as a hard physical stock check. Track "Out of Stock Rejection Rate" per pharmacy and penalise visibility for repeat offenders.

## **11\. Release Roadmap**

**Phase 1: MVP (Months 1-3)**

* Patient App (iOS/Android): Auth, Catalogue Browsing, Search, Cart, Checkout, Prescription Upload.  
* Pharmacy Web Portal: Order acceptance/rejection, basic inventory updating.  
* Admin Panel: Basic user and order management.  
* *Constraint:* Dispatching riders will be handled semi-manually via Admin dispatching to a closed WhatsApp group of verified riders.

**Phase 2: V1.1 \- The Logistics Update (Months 4-5)**

* Rider App (iOS/Android): Automated geo-fenced dispatching, real-time tracking, proof of delivery.  
* Patient App: Live map tracking integration.  
* Automated payment splits (Paystack Subaccounts) to automatically disburse funds to Pharmacy and Rider.

**Phase 3: V2.0 \- Growth & Ecosystem (Months 6-9)**

* Subscriptions for chronic medication (e.g., monthly BP meds).  
* Price Comparison Tool UX improvements.  
* Tele-consultation integration for immediate prescription generation.