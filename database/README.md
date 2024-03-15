# Supervised-Safe-Consumption Database architecture and implementation

Database Documentation

Overview
This document provides comprehensive information about the design, functionality, and management of the PostgreSQL database developed for the project. The database employs a multi-tenancy architecture to efficiently manage data from multiple sites within a shared schema, utilizing site IDs for data isolation.

Schema Creation and Table Design

Multi-Tenant Architecture
Utilizes a shared database environment, enabling efficient data management across multiple sites.
Employs site IDs to isolate and securely manage data for each site, ensuring data privacy and integrity.

Core Tables
Submissions: Stores data related to submissions made by staffs, linked to specific sites and forms.
Answers: Contains responses to various questions within submissions, associated with submission IDs.
Staff: Holds information about staff members, including roles and site associations.
Roles: Defines various roles within the system to manage permissions and access control.
Sites: Lists all sites within the system, serving as a key component for the multi-tenancy architecture.

Relationships and Indexing
Establishes relationships using primary and foreign keys to maintain data integrity and facilitate efficient data retrieval.
Implements indexing on key columns to optimize query performance and speed up data access.

Data Pipeline Overview
The data pipeline facilitates the Extract, Transform, Load (ETL) process, enabling seamless data aggregation and reporting.

Data Extraction
Efficiently extracts data from site tables, ensuring minimal disruption and maintaining data consistency.

Data Transformation
Data Cleaning: Implements processes to clean and validate data to uphold quality standards.

Data Aggregation: Utilizes views and materialized views to aggregate data from different tables, providing a basis for in-depth analysis.

Normalization: Standardizes data formats to ensure system-wide compatibility.

Data Loading
Employs materialized views for data storage, facilitating easy access to aggregated datasets.
Utilizes pg_agent for scheduled data refreshes, ensuring data remains current and relevant.

Views and Materialized Views
Views: Enable dynamic data aggregation without altering underlying raw data, providing a flexible layer for data analysis.
Materialized Views: Store aggregated data and are refreshed at scheduled intervals, serving as a reliable source for reporting and analysis.

Functionality and Stored Procedures
Custom Functions: Enhance data manipulation and automation, streamlining complex operations and workflows.
Stored Procedures: Facilitate batch processing, data validation, and automated reporting, ensuring operational efficiency and data integrity.

Logging and Monitoring
Log Table: Captures system events, anomalies, and operational metrics, providing a foundation for robust system monitoring and auditing.

Trigger Functions: Automatically log significant data operations, such as insertions, updates, and deletions, enhancing transparency and accountability.
Security Implementation

Role-Based Security: Leverages PostgreSQL's Row-Level Security (RLS) to finely control data access based on user roles, ensuring a secure data environment.
Authentication and Authorization: Manages user authentication and authorization, safeguarding sensitive information and enforcing data access policies.


Integration with PowerBI
Describes the process of connecting the PostgreSQL database with PowerBI for enhanced data visualization and interactive analytics.
Highlights dashboard features that enable users to engage with the data through filters, slicers, and real-time updates.


Conclusion
This database is designed to be robust, scalable, and secure, catering to the needs of a multi-tenant environment. Through careful planning and implementation of features such as views, materialized views, and custom functions, it provides a solid foundation for data aggregation, reporting, and analysis.