## Engineering Hub

__Database:__  

mobile_parts - id, name, type, model, created_at, updated_at  
vendors - id, name, created_at, updated_at  
assemble_vehicle - id, name, model, engine, created_at, updated_at  
store - id, parts_id, vendor_id, price, count, created_at, updated_at  
vehicle_parts - id, vehicle_id, parts_id, vendor_id, count, created_at, updated_at  

__ENUM:__  

Engine Types - electric, hybrid, others  

__React API Ajax:__  

Add Part Form - name, type, model  
Product Form - part selector, count  
Edit Store - part, price, count  
Add Vehicle Assembly - name, mode, engine  
Add Parts to Vehicle - vehicle selector, part selector, count (view parts)  

## Industrial Client Center

__Database:__  

invoices - id, client, total, final, created_at  
invoice_service - id, name, price, created_at  
invoice_parts - id, invoices_id, parts_id, price, count, created_at  
invoice_array - id, invoices_id, invoice_service_id, price, count, created_at  

__React API Ajax:__  

Create Invoice Form - client  
Edit Invoice - add part selector, part count, add service selector, service count, assemble vehicle selector (add all vehicle parts)  
Final Invoice - invoice selector (view invoice)  