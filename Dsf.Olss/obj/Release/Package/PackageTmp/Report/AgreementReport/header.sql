--Select 'Customer' as tablename, 'Febry Yansyah' as name
Select GETDATE() AS PrintedDate,
@username as printedby,
CONCAT(@txtStartDate,' - ',@txtEndDate) AS Period,
(CASE 
	WHEN @txtSearch = '' THEN 'ALL'
	WHEN @ddlSearchCriteria = 10 AND @txtSearch != '' THEN @txtSearch
	ELSE ' - '
	END)AS Stat