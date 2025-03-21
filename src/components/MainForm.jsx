import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialData = {
  vendorName: '',
  purchaseOrderNumber: '',
  invoiceNumber: '',
  invoiceDate: '',
  vendor: '',
  totalAmount: '',
  paymentTerms: '',
  invoiceDueDate: '',
  glPostDate: '',
  invoiceDescription: '',
  lineAmount: '',
  department: '',
  account: '',
  location: '',
  expenseDescription: '',
  comments: '',
};

const validationSchema = Yup.object({
  vendorName: Yup.string().required('Required'),
  purchaseOrderNumber: Yup.string().required('Required'),
  invoiceNumber: Yup.string().required('Required'),
  invoiceDate: Yup.string().required('Required'),
  vendor: Yup.string().required('Required'),
  totalAmount: Yup.number().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  invoiceDueDate: Yup.string().required('Required'),
  glPostDate: Yup.string().required('Required'),
  invoiceDescription: Yup.string().required('Required'),
  lineAmount: Yup.number().required('Required'),
  department: Yup.string().required('Required'),
  account: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  expenseDescription: Yup.string().required('Required'),
  comments: Yup.string(),
});

const MainForm = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h2 className="text-xl font-bold mb-4">Vendor Details</h2>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          localStorage.setItem('invoiceForm', JSON.stringify(values));
          alert('Form Submitted and Saved to Local Storage');
        }}
      >
        {({ setValues, values }) => (
          <Form className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Vendor Information</label>
              <Field name="vendorName" className="w-full border p-2 rounded" />
              <ErrorMessage name="vendorName" component="div" className="text-sm text-red-500" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Purchase Order Number</label>
              <Field name="purchaseOrderNumber" className="w-full border p-2 rounded" />
              <ErrorMessage name="purchaseOrderNumber" component="div" className="text-sm text-red-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Invoice Number</label>
                <Field name="invoiceNumber" className="w-full border p-2 rounded" />
                <ErrorMessage name="invoiceNumber" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Invoice Date</label>
                <Field name="invoiceDate" type="date" className="w-full border p-2 rounded" />
                <ErrorMessage name="invoiceDate" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Select Vendor</label>
                <Field name="vendor" as="select" className="w-full border p-2 rounded">
                  <option value="">Select Vendor</option>
                  <option value="Vendor A">Vendor A</option>
                  <option value="Vendor B">Vendor B</option>
                </Field>
                <ErrorMessage name="vendor" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Payment Terms</label>
                <Field name="paymentTerms" className="w-full border p-2 rounded" />
                <ErrorMessage name="paymentTerms" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Total Amount (USD)</label>
                <Field name="totalAmount" type="number" className="w-full border p-2 rounded" />
                <ErrorMessage name="totalAmount" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Invoice Due Date</label>
                <Field name="invoiceDueDate" type="date" className="w-full border p-2 rounded" />
                <ErrorMessage name="invoiceDueDate" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">GL Post Date</label>
                <Field name="glPostDate" type="date" className="w-full border p-2 rounded" />
                <ErrorMessage name="glPostDate" component="div" className="text-sm text-red-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Invoice Description</label>
                <Field name="invoiceDescription" as="textarea" rows={2} className="w-full border p-2 rounded" />
                <ErrorMessage name="invoiceDescription" component="div" className="text-sm text-red-500" />
              </div>
            </div>

            {/* Expense Details */}
            <h3 className="text-lg font-semibold mt-6 mb-2">Expense Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Line Amount</label>
                <Field name="lineAmount" type="number" className="w-full border p-2 rounded" />
                <ErrorMessage name="lineAmount" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Department</label>
                <Field name="department" className="w-full border p-2 rounded" />
                <ErrorMessage name="department" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Account</label>
                <Field name="account" className="w-full border p-2 rounded" />
                <ErrorMessage name="account" component="div" className="text-sm text-red-500" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Location</label>
                <Field name="location" className="w-full border p-2 rounded" />
                <ErrorMessage name="location" component="div" className="text-sm text-red-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Expense Description</label>
                <Field name="expenseDescription" as="textarea" rows={2} className="w-full border p-2 rounded" />
                <ErrorMessage name="expenseDescription" component="div" className="text-sm text-red-500" />
              </div>
            </div>

            {/* Comments */}
            <h3 className="text-lg font-semibold mt-6 mb-2">Comments</h3>
            <Field name="comments" as="textarea" rows={3} className="w-full border p-2 rounded" />
            <ErrorMessage name="comments" component="div" className="text-sm text-red-500" />

            {/* Actions */}
            <div className="flex flex-wrap justify-between mt-6 gap-2">
              <button
                type="button"
                onClick={() => setValues(initialData)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Reset
              </button>
              <div className="space-x-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save as Draft
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  Submit & New
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  const data = localStorage.getItem('invoiceForm');
                  if (data) {
                    const parsed = JSON.parse(data);
                    alert(`Form Data from Local Storage:\n\n${JSON.stringify(parsed, null, 2)}`);
                  } else {
                    alert('No data found in local storage');
                  }
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Show Form Data & Comments
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MainForm;
