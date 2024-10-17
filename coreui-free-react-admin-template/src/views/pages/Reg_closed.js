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

const Reg_closed = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h4 className="pt-3">Registration has been closed!</h4>
              <h5>Stay tuned for the BayMUN XVII conference...</h5>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Reg_closed
