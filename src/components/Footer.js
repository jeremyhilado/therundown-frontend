import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";

function Footer() {
  return (
    <MDBFooter color="indigo" className="font-small darken-3 footer">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12" className="py-1">
            <div className="mb-5 flex-center">
							<a href='https://www.linkedin.com/in/jeremy-hilado/' target='_blank' rel="noopener noreferrer"><MDBIcon fab icon='linkedin-in' size='2x' clasName='mr-5' /></a>
							<a href='https://github.com/jeremyhilado' target='_blank' rel="noopener noreferrer"><MDBIcon fab icon='github' size='2x' className='ml-5' /></a>
						</div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; 2020 Jeremy Hilado
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer