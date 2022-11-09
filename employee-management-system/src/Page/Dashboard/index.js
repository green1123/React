//導入React,
//useState 會回傳一個包含兩個值的 array，第一個值是 state、第二個值是用來更新 state 的函式。
//useEffect 有兩個參數，第一個參數是 Effect function，第二個則是 depandancy array。
import React, { useEffect,useState } from 'react'
//導入Swal
import Swal from 'sweetalert2';
//導入Header
import Header from './Header';
//導入List
import List from './List';
//導入Add
import Add from './Add';
//導入Edit
import Edit from './Edit';
//導入employeesDate
import { employeesData } from '../../data';

function Dashboard() {
    //useState,employees為初始值使用setEmployees修改後將新值儲存在employeesData
    const [employees, setEmployees] = useState(employeesData);
    //修改人員資料時調用
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    //增加人員資料
    const [isAdding, setIsAdding] = useState(false);
    //編輯人員資料
    const [isEditing, setIsEditing] = useState(false);
    //翻頁
    const [currentPage, setCurrentPage] = useState(1);
    const defulatPageNum = 3;
    const allPageNum = employeesData.length / defulatPageNum + (employeesData.length % 3 == 0 ? 0 : 1);

    //currentPage只要做動即刷新
    useEffect(() => {

       let  rangeleft = (currentPage - 1) * defulatPageNum;
       let  rangeright = currentPage * defulatPageNum;

        setEmployees(employeesData.slice(rangeleft,rangeright))
    }, [currentPage]);

    const gopage = (p) => {
        setCurrentPage(p)
    }


    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [employee] = employees.filter(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }


    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setIsAdding={setIsAdding}
                    />
                    <List
                        employees={employees}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        gopage={gopage}
                        allPageNum={allPageNum}
                        currentPage={currentPage}
                        
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Dashboard;