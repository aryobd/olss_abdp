--Select 'Customer' as tablename, 'Daniel Kurniawan' as name
Select GETDATE() AS PrintedDate,
@username as printedby,
CONCAT(@txtStartDate,' - ',@txtEndDate) AS Period