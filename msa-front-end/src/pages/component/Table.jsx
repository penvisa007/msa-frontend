import React , { useState } from 'react'
import DataTable from 'react-data-table-component'
import Loading from './Loading';
import Pagination from './Pagination';
import Search_bar from './Search_bar';


const customStyles = {
	rows: {

		
	  style: {
		
		'&:hover': {
		  backgroundColor: '#f2f2f2',
		  cursor: 'hand',
		},
	  },
	},
	headCells: {
	  style: {
		fontSize: '16px',
		fontWeight: 'bold',
		color: 'orange',
		backgroundColor: '#f0f0f0',
		padding: '5px',
		justifyContent: 'center',
	  },
	},
	cells: {
	  style: {
		fontSize: '14px',
		color: '#666',
		padding: '10px',
	  },

	  
	  cells: {
		0: { // cell 1
		  style: {
			justifyContent: 'left',
		  },
		},
		1: { // cell 2
		  style: {
			justifyContent: 'center',
		  },
		},
	  },
	},

  };





function Table(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
  
	const handlePageChange = (pageNumber) => {
	  setCurrentPage(pageNumber);
	};
  
	const paginatedData = props.data.slice(
	  (currentPage - 1) * itemsPerPage,
	  currentPage * itemsPerPage
	);

	return (

		
		<div style={{backgroundColor: '#dedede'}} className="div">

			<div style={{width: '100%', height: '50px' ,backgroundColor: '#dedede'}}>
				<Search_bar style={{backgroundColor: 'white'}}/>
				
				<button hidden = {props.is_show_button == true ? false : true} onClick={()=>props.button_event()} type="button" className="btn btn-primary" style={{marginLeft: '10px' , height: 'auto', marginTop: '-50px', marginLeft: '20px', color: 'white'}}>{props.button}</button>

			</div>

			<div style={{ padding: '20px', width: '100%'}}>

				<div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '7px', backgroundColor	: 'white'}} className="div">
					
						
				<DataTable
				paginationComponent={null}
				progressComponent={<Loading />}
				progressPending={props.loading_progress}
				columns={props.columns}
				data={paginatedData}
				customStyles={customStyles}
				/>
				<Pagination
				data={props.data}
				itemsPerPage={itemsPerPage}
				onPageChange={handlePageChange}
				/>

				</div>
			
				
			</div>
		</div>
	
	 

	
	);
}

export default Table
