import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const TaskFormik = ({ add }) => {

    const initialValues = {
        name: '',
        description: '',
        completed: false,
    } 

    const registerSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(3, 'Task to short')
                .required('Task is required'),
            description: Yup.string()
                .max(200, 'Username to long'),
        }
    )

    const addTask = (values) => {
        add(values.name, values.description
        )
    }

    return (
        <div>
            <h4 className='text-start mt-5'>Create task</h4>
            <Formik
                initialValues = { initialValues }
                validationSchema = { registerSchema } 
                onSubmit={async (values) => {
                    addTask(values)
                }}               
            >

                {({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                }) => (
                    <Form>
                        <label htmlFor="name"className=''>Name</label>
                        <Field id="name" name="name" placeholder="Enter the Task name" type="text" className='ms-2' />
                        {
                            errors.name && touched.name && (
                                <ErrorMessage name="name" component="div"></ErrorMessage>
                            )
                        }
                        <label htmlFor='description'className='ms-3 me-2'>Description</label>
                        <Field id='description' name='description' placeholder='Enter the Task description' type='text' ></Field>
                        {
                            errors.description && touched.description && (
                                <ErrorMessage name='description' component='div'></ErrorMessage>
                            )
                        }
                        <Field id='completed' name='completed' placeholder='Task completed' type='checkbox' className='ms-3 me-2'></Field>
                        <label htmlFor='completed'>Task completed</label>
                        <div className='mt-3'>
                            <button type="submit" className='btn btn-primary' style={{minWidth:'15em'}}>Add todo</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    );
}

export default TaskFormik;
