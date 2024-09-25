--Select 'Customer' as tablename, 'Ayu' as name
Select GETDATE() AS PrintedDate,
@username as PrintedBy,
CONCAT(@txtStartDate,' - ',@txtEndDate) AS Period,
@policeNumber as PoliceNo