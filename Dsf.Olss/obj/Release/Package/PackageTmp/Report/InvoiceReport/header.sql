--Select 'Customer' as tablename, 'Febry Yansyah' as name
Select GETDATE() AS PrintedDate,
@username as printedby,
CONCAT(@txtStartInvoiceCreatedDate,' - ',@txtEndInvoiceCreatedDate) AS Period