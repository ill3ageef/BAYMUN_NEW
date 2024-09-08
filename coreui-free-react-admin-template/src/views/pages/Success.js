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

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">#{id}</h1>
              <h4 className="pt-3">Success! Please take your ID to the following webpage for payment:</h4>
              <p><a class="link-opacity-100" href="http://  www.google.com" target='_blank'>www.google.com</a></p>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Success
