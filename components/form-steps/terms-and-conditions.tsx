"use client"

import { useFormContext } from "@/context/form-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsAndConditions() {
  const { formData, updateFormData } = useFormContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Terms and Conditions</h3>

          <ScrollArea className="h-[300px] border rounded-md p-4">
            <div className="space-y-4 text-sm">
              <h4 className="font-medium">CITICASH FINANCIAL SERVICES MICROFINANCE P/L LOAN DETAILS:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loan amounts range from USD100.00 to a maximum loan of USD2000.00</li>
                <li>Loan tenure, maximum 60 days</li>
                <li>Loan interest, 1% per day for loans with a tenure upto 15 days</li>
                <li>Loan interest, 20% per 30 days for loans with a tenure above 20 days up to 60 days</li>
                <li>Once-off Admin fees, 3% deducted on approved loan or paid upfront by client</li>
              </ul>

              <h4 className="font-medium">To qualify for CITICASH FINANCIAL SERVICES MICROFINANCE P/L Loan:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Applicants should be aged between 18 and 60 years</li>
                <li>Applicants should complete an application form</li>
              </ul>

              <h4 className="font-medium">Applicants should attach the following items on the application form:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Copy of ID for Applicant/Owners, Guarantor</li>
                <li>Proof of Residence, If not owned an affidavit</li>
                <li>Company documents, (Certificate of incorporation and Summary documents)</li>
                <li>
                  Applicants are required to provide proof of income, either Sales records, bank statement, ecocash
                  statement
                </li>
                <li>Copy of contract where applicable</li>
                <li>Council Business License</li>
                <li>Tax clearance</li>
                <li>
                  Security Registration book for example a Car reg book given that the vehicle is pledged as collateral
                  security
                </li>
                <li>Include Bank statements where applicable. (at least 3 months)</li>
              </ul>

              <p>
                <strong>Note:</strong> Employer's consent section of the application form must be signed and stamped by
                the employer for scheme loans.
              </p>

              <h4 className="font-medium">Consent Clause</h4>
              <p>"The customer agrees and authorizes the Microfinance or approved credit reference bureau to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  make inquiries from any bank, financial institution or approved credit reference bureau in Zimbabwe to
                  confirm any information provided by the customer;
                </li>
                <li>
                  Seek information from any bank, financial institution or approved credit reference bureau when
                  assessing the client at any time during the existence of the customer's account.
                </li>
                <li>
                  Disclose to any approved credit reference bureau information relating to the account maintained at the
                  financial institution".
                </li>
              </ul>

              <p>
                CITICASH MICROFINANCE may approve or decline an application for credit facility at its absolute
                discretion, and is not obliged to disclose any reasons for decline or approval of an application.
              </p>

              <p>
                I/We agree to pay interest on the principal loan on a simple interest calculation basis at the
                creditor's lending rates. All payments offset interest and costs first. All installments shall be paid
                to the offices of the creditor or at any of its branches unless otherwise advised in writing. A penalty
                interest in respect of any balances outstanding following the expiry or any payment due dates of the
                facility or any unauthorized balance shall be charged at 2% per day.
              </p>

              <p>
                In the event of failing to pay any amount as and when it becomes due hereunder or in the event of an
                undue delay in the sale of my property, or my committing of an act of insolvency, or attempting to
                compromising with creditors, or convening a meeting of creditors, or surrendering my estate as insolvent
                or applying for assignment, or in the event of any application being made from the sequestration of my
                estate or should the judgment of any court be entered against me or in the event of my doing an act,
                matter or thing which has the effect of jeopardizing or prejudicing the creditor's position in any way
                whatsoever, then and in any such event the creditor shall have the right without notice, to claim and
                recover the whole of the Loan principal and interest, together with costs and collection charges, and to
                institute legal proceedings against me.
              </p>

              <p>
                Repayments will be firstly used to pay legal costs (if any) and thereafter additional/penalty interest
                (if any), then the total cost of credit and lastly to reduce the balance of the outstanding amount
                originally owed to CITICASH FINANCIAL SERVICES Microfinance. In the event of a loan granted, I agree to
                abide by the terms and conditions of the loan. Further, should I fail to repay and CITICASH FINANCIAL
                SERVICES Private Limited proves that I am deliberately avoiding contact, so as to avoid payments. I
                authorize CITICASH FINANCIAL SERVICES Private limited or its Agent(s) to contact, advise and collect
                their dues from my next of kin and Guarantor.
              </p>

              <p>
                I/we accept liability for and undertake to pay all costs including Legal Practitioner and client costs
                incurred by the creditor in collecting the debt and all collection commission due to the creditor's
                Legal Practitioners. I hereby agree to the jurisdiction of the magistrate courts anywhere in Zimbabwe.
                Notwithstanding any express or implied provisions of this Acknowledgement to the contrary, any latitude
                or extension of time which may be allowed by the creditor in respect of payments, or in relation to any
                provision of this Acknowledgement shall not under any circumstances be deemed to be a waiver of the
                creditor's rights herein.
              </p>

              <p>
                Further, I/We renounce the benefits of the exceptions non numeratae pecuniae, non causa debiti, error
                calculi, revision of accounts, and no value received the meaning of which I/we acknowledge
                myself/ourselves to be fully acquainted. The creditor may grant time or other indulgences to the debtor,
                without affecting the creditor's rights herein. Notwithstanding any express or implied provisions of
                this Acknowledgement of Debt, any latitude or extensions of time which may be allowed by the creditor in
                respect of payments shall not be deemed to be a waiver of the creditor's rights herein. I/We agree that
                that the creditor shall have the right to institute legal action in respect of any amount due in terms
                hereof in the Magistrates' Court or any other Court and I/we consent and submit to the jurisdiction of
                the Court in which such action is brought notwithstanding that the action or claim may exceed the
                jurisdiction of such Court.
              </p>

              <p>
                After CITICASH FINANCIAL SERVICES Microfinance has approved the application for a loan, the loan will be
                paid into the bank account indicated or ecocash account indicated or Cash. I hereby agree that I cannot
                hold CITICASH FINANCIAL SERVICES Microfinance responsible for any damage or loss caused by transferring
                of money to my specified mode of payment and account by CITICASH FINANCIAL SERVICES Microfinance.
              </p>

              <h4 className="font-medium">The disbursed loan will be subject to the following conditions:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Payments will be applied to interest first then to capital,</li>
                <li>
                  CITICASH FINANCIAL SERVICES Microfinance reserves the right to adjust interest rates according to
                  prevailing inflation rates or changes in currency as permitted by the laws of Zimbabwe.
                </li>
                <li>
                  All costs to recover the loan principal, finance charges including interest plus relevant costs such
                  as travelling telephones, tracing/search, legal fees, cartage and freight, among others, will be borne
                  by the borrower. Any monies paid by the borrower will first be appropriated towards meeting these
                  costs before reducing the amount owing.
                </li>
                <li>
                  I understand and agree that the loan administration/ arrangement fee will be deducted from my loan and
                  the balance credited to my account or cash.
                </li>
                <li>
                  The administration fee, is non-refundable and it will not be discounted in the event of early
                  settlement.
                </li>
                <li>
                  There will be a reduction of the remaining interest to be paid, assuming the loan has been paid
                  earlier than the maturity date.
                </li>
                <li>
                  If I fail to honor this agreement my business and personal belongings which I have ceded/ declared in
                  the application form CITICASH FINANCIAL SERVICES reserves the right to attach/ repossess or sell in
                  line with the laws and regulations of Zimbabwe.
                </li>
              </ul>

              <p>
                <strong>NB:</strong> The borrower authorizes CITICASH FINANCIAL SERVICES Private Limited to float public
                notices through any media and other platforms, with or without borrower's photograph so the borrower
                could be traced in the event of him/her absconding, specifying the borrower is wanted. All relevant
                information may be disclosed to relevant third parties that may considered key in recovering all sums
                due. The borrower indemnifies the lender harmless for doing so.
              </p>

              <h4 className="font-medium">
                CITICASH FINANCIAL SERVICES Microfinance may immediately demand payment of the whole amount outstanding
                at any time if I:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Commit any breach of this agreement or commit an act of insolvency;</li>
                <li>Die;</li>
                <li>Made a false presentation at the time of applying for the loan or;</li>
                <li>
                  Do anything that may prejudice CITICASH FINANCIAL SERVICES Microfinance rights in terms of this
                  agreement;
                </li>
                <li>
                  Lose my employment or business which directly affects my earnings hence have a negative impact on my
                  repayments.
                </li>
              </ul>

              <p>
                The Applicant understands and agrees that he/she has signed the application form as acceptance of the
                aforesaid Terms and conditions.
              </p>
            </div>
          </ScrollArea>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => updateFormData({ agreedToTerms: checked === true })}
                required
              />
              <Label
                htmlFor="agreedToTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and agree to the terms and conditions
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="executionPlace">Place</Label>
                <Input
                  id="executionPlace"
                  value={formData.executionPlace}
                  onChange={(e) => updateFormData({ executionPlace: e.target.value })}
                  placeholder="Enter place of execution"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="executionDate">Date</Label>
                <Input
                  id="executionDate"
                  type="date"
                  value={formData.executionDate}
                  onChange={(e) => updateFormData({ executionDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="debtorName">Debtor Name</Label>
                <Input
                  id="debtorName"
                  value={formData.debtorName}
                  onChange={(e) => updateFormData({ debtorName: e.target.value })}
                  placeholder="Enter debtor name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guarantorName">Guarantor Name</Label>
                <Input
                  id="guarantorName"
                  value={formData.guarantorName}
                  onChange={(e) => updateFormData({ guarantorName: e.target.value })}
                  placeholder="Enter guarantor name"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
