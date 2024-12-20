## Engineering Hub

__Database:__  

mobile_parts - id, name, type, model, createdAt, updatedAt  
vendors - id, name, createdAt, updatedAt  
assemble_vehicle - id, name, model, engine, createdAt, updatedAt  
store - id, parts_id, vendor_id, price, count, createdAt, updatedAt  
vehicle_parts - id, vehicle_id, parts_id, vendor_id, count, createdAt, updatedAt  

__ENUM:__  

Engine Types - electric, hybrid, others  

__React API Ajax:__  

Add Part Form - name, type, model  
List Form  
Add Vendor - name  
List Vendors  
Add Vehicle Assembly - name, model, engine  
List Vehicles  
Add Parts to Vehicle - vehicle selector, part selector, vendor selector, count (view parts)  
Product Form - part selector, vendor selector, price, count  
Edit Store - part, price, count  
List Store  

## Industrial Client Center

__Database:__  

invoices - id, client, total, final, created_at, updated_at  
invoice_services - id, name, price, created_at, updated_at  
invoice_parts - id, invoices_id, store_id, parts_id, vendor_id, price, count, created_at, updated_at  
invoice_array - id, invoices_id, service_id, price, count, created_at, updated_at  

__React API Ajax:__  

Create Invoice Form - client  
List Invoices  
View Invoice  
Edit Invoice - add part selector, part count, add service selector, service count, assemble vehicle selector (add all vehicle parts)  
Final Invoice - edit invoice form (navigate to view invoice)  
