import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import { useSearchParams } from 'react-router-dom'

const Confirm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h4 className="pt-3">Success! Your application has been submitted and is currently being reviewed</h4>
              <h5>You will recieve an email for your confirmation. Thank you!</h5>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Confirm
