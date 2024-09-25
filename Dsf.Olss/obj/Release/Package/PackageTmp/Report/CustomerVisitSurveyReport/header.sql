--Select 'Customer' as tablename, 'Febry Yansyah' as name
Select GETDATE() as PrintedDate,
@username as printedby,
CONCAT(@txtStartDate,' - ',@txtEndDate) AS period