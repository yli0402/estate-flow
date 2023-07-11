import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteTenantAsync, getSingleTenantAsync, getTenantsAsync} from "../../redux/tenants/tenantsThunks";
import {
    expSelectedTenant, isTenantAddOpen,
    isTenantDetailOpen,
    openTenantADD,
    openTenantDetail
} from "../../redux/tenants/tenantsReducer";
import TenantDetails from "./TenantDetail";
// need to change css
import '../worker/worker.css';
import AddPropertyForm from "./AddTenantForm";

const TenantsListing = () => {
    const select = useSelector(expSelectedTenant)
    const dispatch = useDispatch();
    const tenantDetailIsOpen = useSelector(isTenantDetailOpen)
    const tenantAddIsOpen = useSelector(isTenantAddOpen)
    useEffect(() => {
        dispatch(getTenantsAsync());
    });
    const allTenants = useSelector((state) => state.tenants.tenants);
    let renderedPosts = [];
    // all styles need to be changed after here.

    if(Array.isArray(allTenants)){
        if(allTenants.length !== 0){
            renderedPosts = allTenants.map((allTenants) => (
                <article className="divItem" key={allTenants.id}>

                    {/*not sure what info to display here, need to change later*/}
                    <h4 className="single-line" id = {allTenants.id} >{allTenants.name}</h4>
                    <img src={allTenants.imageURL} alt={allTenants.name} className="WorkerImg" />

                        <button
                            className="btn btn-outline-dark"
                            style={{ marginTop: '10px' }}
                            onClick={ () => {
                                dispatch(getSingleTenantAsync(allTenants.id));
                                dispatch(openTenantDetail());
                            } }>
                            DETAIL
                        </button>

                        <button
                            className="btn btn-outline-dark"
                            style={{ marginTop: '10px' }}
                            onClick={ () => {
                                dispatch(deleteTenantAsync(allTenants.id));
                            } }>
                            DELETE
                        </button>

                </article>
            ))
        }
    }



    return (
        <div className="property-listing-page">
            <div className="property-listing-contents">
                <div className="property-listing-left">
                    <h2>Search</h2>
                </div>
                <div className="property-listing-right">
                    <div className="property-listing-header">
                        <h2>Tenants</h2>
                        <div className="btn btn-outline-primary" onClick={() => dispatch(openTenantADD())}>
                            Add property
                        </div>
                    </div>
                    <section className="sectionContainer">
                        {renderedPosts}

                        {tenantDetailIsOpen && <TenantDetails />}
                        {tenantAddIsOpen && <AddPropertyForm />}


                    </section>
                </div>
            </div>
        </div>
    )

}

export default TenantsListing;