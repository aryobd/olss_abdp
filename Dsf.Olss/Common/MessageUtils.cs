using Dsf.Lib.Constant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dsf.Olss.Common
{
    public class MessageUtils
    {
        public static void SetErrorMessage(string statusButton, TempDataDictionary tmp)
        {
            if ((statusButton == "Deactivate"))
            {
                tmp["Error"] = OlssMessage.DeactivateError;
            }
            else if (statusButton == "Activate")
            {
                tmp["Error"] = OlssMessage.DeactivateError;
            }
            else if (statusButton == "Submit")
            {
                tmp["Error"] = OlssMessage.SubmitError;
            }
            else if (statusButton == "SaveUnitPrep")
            {
                tmp["Error"] = OlssMessage.SaveErrorUnitPrep;
            }
            else if (statusButton == "Email")
            {
                tmp["Error"] = OlssMessage.EmailError;
            }
            else if (statusButton == "RALEndorsee")
            {
                tmp["Error"] = OlssMessage.RALEndorsee;
            }
            else if (statusButton == "RALObject")
            {
                tmp["Error"] = OlssMessage.RALObject;
            }
            else if (statusButton == "CreateBASTNullUnitPrepId")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessCreateBASTNullUnitPrepId, tmp["UnitPreparationId"].ToString());
            }
            else if (statusButton == "CreateBASTDeletedUnitPrepId")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessCreateBASTDeletedUnitPrepId, tmp["UnitPreparationId"].ToString());
            }
            else if (statusButton == "CreateBASTNonCreatableUnitPrepId")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessCreateBASTNonCreatableUnitPrepId, tmp["UnitPreparationId"].ToString());
            }
            else if (statusButton == "CreateBASTNullBastActualDate")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessCreateBASTNullBastActualDate, tmp["UnitPreparationId"].ToString());
            }
            else if (statusButton == "RegRPCIsNotExist")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessRegRPCIsNotExist, tmp["RegReplacementId"].ToString());
            }
            else if (statusButton == "RegRPCIsDelete")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessRegRPCIsDelete, tmp["RegReplacementId"].ToString());
            }
            else if (statusButton == "BASTReplacementUnitIsNotExist")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessBASTReplacementUnitIsNotExist, tmp["BASTReplacementUnitId"].ToString());
            }
            else if (statusButton == "BASTOPLUnitIsNotExist")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessBASTOPLUnitIsNotExist, tmp["BASTOPLUnitId"].ToString());
            }
            else if (statusButton == "BASTReplacementUnitIsDelete")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessBASTReplacementUnitIsDelete, tmp["BASTReplacementUnitId"].ToString());
            }
            else if (statusButton == "BASTOPLUnitIsDelete")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessBASTOPLUnitIsDelete, tmp["BASTOPLUnitId"].ToString());
            }
            else if (statusButton == "BASTReplacementSubmitted")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessBASTReplacementSubmitted, tmp["BASTReplacementId"].ToString());
            }
            else if (statusButton == "BASTReplacementFirmed")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenAccessBASTReplacementFirmed, tmp["BASTReplacementId"].ToString());
            }
            else if (statusButton == "BASTOutHasNotFirmed")
            {
                tmp["Error"] = string.Format(OlssMessage.ForbiddenCreateBASTOut);
            }
            else if (statusButton == "Save as Draft")
            {
                tmp["Error"] = OlssMessage.SaveasDraftError;
            }
            else if (statusButton == "Save as DraftBast")
            {
                tmp["Error"] = OlssMessage.SaveasDraftErrorBast;
            }
            else if (statusButton == "Set to Draft")
            {
                tmp["Error"] = OlssMessage.SaveasDraftError;
            }
            else if (statusButton == "SysNumberingLimit")
            {
                tmp["Error"] = OlssMessage.SysNumberingLimit;
            }
            else if (statusButton == "AccessoriesCarroseriesRemains")
            {
                tmp["Error"] = OlssMessage.AccessoriesCarroseriesRemains;
            }
            else if (statusButton == "ApprovalPath")
            {
                tmp["Error"] = OlssMessage.PathInsertError;
            }
            else if (statusButton == "UpdatePromiseToPay")
            {
                tmp["Error"] = OlssMessage.UpdatePaymentToPayConcurrencyError;
            }
            else if (statusButton == "EditInvoice")
            {
                tmp["Error"] = OlssMessage.UpdateInvoiceConcurrencyError;
            }
            else if (statusButton == "SendReminderEmail")
            {
                tmp["Error"] = string.Format(OlssMessage.SendRemainderEmailFailed, tmp["AgreementNumber"].ToString(), tmp["CustomerName"].ToString());
            }
            else if (statusButton == "SendReminderEmailConcurrency")
            {
                tmp["Error"] = OlssMessage.SendRemainderEmailConcurrencyError;
            }
            else if (statusButton == "WarningLetterExist")
            {
                tmp["Error"] = string.Format(OlssMessage.CurrentPeriodWarningLetterExist, tmp["AgreementNumber"].ToString());
            }
            else
            {
                tmp["Error"] = OlssMessage.UpdateError;
            }
        }

        public static void SetErrorMessageDuplicate(string statusButton, TempDataDictionary tmp, string controlName)
        {
            if ((statusButton == "Deactivate"))
            {
                tmp["Error"] = string.Format("{0} already exist. {1}", controlName, OlssMessage.DeactivateError);
            }
            else if (statusButton == "Activate")
            {
                tmp["Error"] = string.Format("{0} already exist. {1}", controlName, OlssMessage.DeactivateError);
            }
            else if (statusButton == "Submit")
            {
                tmp["Error"] = string.Format("{0} already exist. {1}", controlName, OlssMessage.SubmitError);
            }
            else if (statusButton == "Save as Draft")
            {
                tmp["Error"] = string.Format("{0} already exist. {1}", controlName, OlssMessage.SaveasDraftError);
            }
            else if (statusButton == "Set to Draft")
            {
                tmp["Error"] = string.Format("{0} already exist. {1}", controlName, OlssMessage.SaveasDraftError);
            }
            else
            {
                tmp["Error"] = string.Format("{0} already exist. {1}", controlName, OlssMessage.UpdateError);
            }
        }

        public static void SetSuccessMessage(string statusButton, TempDataDictionary tmp)
        {
            if ((statusButton == "Deactivate"))
            {
                tmp["Success"] = OlssMessage.DeactivateSuccess;
            }
            else if (statusButton == "Activate")
            {
                tmp["Success"] = OlssMessage.ActivateSuccess;
            }
            else if (statusButton == "Save as Draft BILWarningLetter")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveAsDraftWarningLetterSuccess, tmp["WarningLetterNo"].ToString());
            }
            else if (statusButton == "Submit BILWarningLetter")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitWarningLetterSuccess, tmp["WarningLetterNo"].ToString());
            }
            else if (statusButton == "Save Changes BILRAL")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveAsDraftRALSuccess, tmp["AgreementNo"].ToString());
            }
            else if (statusButton == "Submit BILRAL")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitRALSuccess, tmp["AgreementNo"].ToString());
            }
            else if (statusButton == "Submit")
            {
                tmp["Success"] = OlssMessage.SubmitSuccess;
            }
            else if (statusButton == "Save as Draft")
            {
                tmp["Success"] = OlssMessage.SaveasDraftSuccess;
            }
            else if (statusButton == "Set to Draft")
            {
                tmp["Success"] = OlssMessage.SaveasDraftSuccess;
            }
            else if (statusButton == "SaveUnitPrep")
            {
                tmp["Success"] = OlssMessage.SaveSuccessUnitPrep;
            }
            else if (statusButton == "SaveBilling")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveEditBilling, tmp["AgreementNo"] as string, tmp["Status"] as string);
            }
            else if (statusButton == "Save as DraftCvs")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveasDraftSuccessCvs, tmp["SurveyNo"] as string);
            }
            else if (statusButton == "SubmitCvs")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitSuccessCvs, tmp["SurveyNo"] as string);
            }
            else if (statusButton == "SubmitEscalate")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitSuccessEscalate, tmp["Module"] as string, tmp["DocNo"] as string);
            }
            else if (statusButton == "Save ChangesCvs")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveChangesSuccessCvs, tmp["SurveyNo"] as string);
            }
            else if (statusButton == "Save as DraftSkd")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveasDraftSuccessSkd, tmp["SkdNo"] as string);
            }
            else if (statusButton == "SubmitSkd")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitSuccessSkd, tmp["SkdNo"] as string);
            }
            else if (statusButton == "Save ChangesSkd")
            {
                tmp["Success"] = string.Format(OlssMessage.UpdateSuccessSkd, tmp["SkdNo"] as string);
            }
            else if (statusButton == "SubmitAgreement")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitSuccessAgreement, tmp["AgreementNumber"] as string);
            }
            else if (statusButton == "Save ChangesAgreement")
            {
                tmp["Success"] = string.Format(OlssMessage.UpdateSuccessAgreement, tmp["AgreementNumber"] as string);
            }
            else if (statusButton == "Save as DraftAgreement")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveasDraftSuccessAgreement, tmp["AgreementNumber"] as string);
            }
            else if (statusButton == "Save as DraftBast")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveAsDraftSuccessBast, tmp["BastSupNo"].ToString(), tmp["BastCustNo"].ToString(), tmp["BastRemaining"].ToString());
            }
            else if (statusButton == "Save ChangesBast")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveChangesSuccessBast, tmp["BastSupNo"] as string, tmp["BastCustNo"] as string);
            }
            else if (statusButton == "Save as FinalBast")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveAsFinalSuccessBast, tmp["BastSupNo"] as string, tmp["BastCustNo"] as string);
            }
            else if (statusButton == "Save as DraftBastRpc")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveAsDraftSuccessBastRpc, tmp["BastNo"] as string);
            }
            else if (statusButton == "Save as DraftBastRpcMemo")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveAsDraftSuccessBastRpcMemo, tmp["BastNo"] as string, tmp["MemoNo"] as string);
            }
            else if (statusButton == "Save ChangesBastRpc")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveChangesSuccessBastRpc, tmp["BastNo"] as string);
            }
            else if (statusButton == "SubmitBastRpc")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitSuccessBastRpc, tmp["BastNo"] as string);
            }
            else if (statusButton == "Save As FinalBastRpc")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveAsFinalSuccessBastRpc, tmp["BastNo"] as string);
            }
            else if (statusButton == "SubmitPurchaseOrder")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitSuccessPurchaseOrder, tmp["PONumber"] as string);
            }
            else if (statusButton == "Save as DraftPurchaseOrder")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveasDraftSuccessPurchaseOrder, tmp["PONumber"] as string);
            }
            else if (statusButton == "Save ChangesPurchaseOrder")
            {
                tmp["Success"] = string.Format(OlssMessage.UpdateSuccessPurchaseOrder, tmp["PONumber"] as string);
            }
            else if (statusButton == "SubmitMTNWorkOrder")
            {
                tmp["Success"] = string.Format(OlssMessage.SubmitSuccessMtnWorkOrder, tmp["mtnWorkOrder"] as string);
            }
            else if (statusButton == "Save as DraftMTNWorkOrder")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveasDraftSuccessMtnWorkOrder, tmp["mtnWorkOrder"] as string);
            }
            else if (statusButton == "Save ChangesMTNWorkOrder")
            {
                tmp["Success"] = string.Format(OlssMessage.UpdateSuccessMtnWorkOrder, tmp["mtnWorkOrder"] as string);
            }
            else if (statusButton == "SaveInvoice")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveSuccessDeliveryInvoice, tmp["AgreementNo"] as string);
            }
            else if (
                statusButton == "Approve" ||
                statusButton == "Check" ||
                statusButton == "Reject" ||
                statusButton == "Revise" ||
                statusButton == "Sign By Customer" ||
                statusButton == "Terminate"
            )
            {
                var pastTense = string.Empty;

                switch (statusButton.ToLower())
                {
                    case "approve":
                        pastTense = "approved";
                        break;
                    case "check":
                        pastTense = "checked";
                        break;
                    case "reject":
                        pastTense = "rejected";
                        break;
                    case "revise":
                        pastTense = "revised";
                        break;
                    case "sign by customer":
                        pastTense = "sign by customer";
                        break;
                    case "terminate":
                        pastTense = "terminated";
                        break;
                }

                tmp["Success"] = string.Format(
                    OlssMessage.ModuleNumberSuccess, tmp["ModuleName"] as string,
                    tmp["DocNo"] as string, pastTense
                );
            }
            else if (statusButton.Equals("PrintReport"))
            {
                tmp["Success"] = string.Format(OlssMessage.PrintReport, tmp["RPT_NAME"] as string);
            }
            else if (statusButton == "RpcRegister")
            {
                tmp["Success"] = string.Format(OlssMessage.RpcReg, tmp["RegNo"] as string);
            }
            else if (statusButton == "RpcUpdate")
            {
                tmp["Success"] = string.Format(OlssMessage.RpcUpd, tmp["RegNo"] as string);
            }
            else if (statusButton == "UpdatePromiseToPay")
            {
                tmp["Success"] = string.Format(OlssMessage.UpdatePaymentToPaySuccess, tmp["AgreementNumber"].ToString());
            }
            else if (statusButton == "SendReminderEmail")
            {
                tmp["Success"] = string.Format(OlssMessage.SendRemainderEmailSuccess, tmp["AgreementNumber"].ToString(), tmp["CustomerName"].ToString());
            }
            else if (statusButton == "Save Module")
            {
                tmp["Success"] = string.Format(OlssMessage.ModuleNumberSaveSuccess, tmp["ModuleName"] as string, tmp["DocNo"] as string);
            }
            else if (statusButton == "Submit RAL")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveRAL, tmp["AgreementNo"] as string, "submitted");
            }
            else if (statusButton == "Save as Draft RAL")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveRAL, tmp["AgreementNo"] as string, "saved");
            }
            else if (statusButton == "SaveMemo")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveMemo, tmp["AgreementNumber"].ToString());
            }
            else if (statusButton == "AddBillPaymentHistory")
            {
                tmp["Success"] = string.Format(OlssMessage.SaveBillPaymentHistory, tmp["AgreementNumber"].ToString());
            }
            else if (statusButton == "ActionCloseAgreement")
            {
                tmp["Success"] = string.Format(OlssMessage.ActionCloseAgreement, tmp["AgreementNumber"] as string);
            }
            else if (statusButton == "SaveInvoiceReceipt")
            {
                tmp["Success"] = string.Format(OlssMessage.UpdateInvoiceReceiptSuccess, tmp["InvoiceNo"].ToString());
            }
            else
            {
                tmp["Success"] = OlssMessage.UpdateSuccess;
            }
        }
    }
}
