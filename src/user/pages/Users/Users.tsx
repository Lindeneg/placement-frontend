import { Fragment, useEffect, useState } from 'react'

import useHttp from '../../../common/hooks/http.hook';
import ErrorModal from '../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import UsersList from '../../components/UsersList/UsersList';
import { getURL, devLog } from '../../../common/util/util';
import { Functional, UseStateTuple, UserResponse } from "../../../common/types";
 

/**
 * Component with list of Users to be utilized in a UsersList.
 */

const Users: Functional = props => {
    const { isLoading, error, clearError, sendRequest }     = useHttp<UserResponse[]>();
    const [users, setUsers]: UseStateTuple<UserResponse[]>  = useState<UserResponse[]>([]);
    const [didRequest, setDidRequest]                       = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try  {
                const data: UserResponse[] | void = await sendRequest(getURL('/users'));
                data && setUsers(data);
            } catch(err) {
                devLog(err);
            } finally {
                setDidRequest(true);
            }
        })();
    }, [sendRequest]);

    return (
        <Fragment>
            <ErrorModal error={error} show={!!error} onClear={clearError} />
            {isLoading && <div className='center'><Spinner asOverlay /></div>}
            {!isLoading && didRequest && <UsersList users={users} />}
        </Fragment>
    )
};

export default Users;