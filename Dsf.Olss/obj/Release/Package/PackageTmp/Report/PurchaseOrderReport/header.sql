--Select 'Customer' as tablename, 'Daniel Kurniawan' as name
Select GETDATE() AS PrintedDate,
@username as printedby,
CONCAT(@txtStartDate,' - ',@txtEndDate) AS Period,
(CASE 
	WHEN @txtSearch = '' THEN 'ALL'
	WHEN @ddlSearchCriteria = 11 AND @txtSearch != '' THEN @txtSearch
	ELSE ' - '
	END)AS Stat