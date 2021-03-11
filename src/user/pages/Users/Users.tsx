import { Fragment, useEffect, useState } from 'react'

import useHttp from '../../../common/hooks/http';
import ErrorModal from '../../../common/components/UI/Modal/ErrorModal/ErrorModal';
import Spinner from '../../../common/components/UI/Spinner/Spinner';
import UsersList from '../../components/UsersList/UsersList';
import { getURL } from '../../../common/util/util';
import { BaseProps, Functional, UseStateTuple, UserResponse } from "../../../common/types";
 

interface UsersProps extends BaseProps {};


/**
 * Component with list of Users to be utilized in a UsersList.
 */

const Users: Functional<UsersProps> = props => {
    const { isLoading, error, clearError, sendRequest }     = useHttp<UserResponse[]>();
    const [users, setUsers]: UseStateTuple<UserResponse[]>  = useState<UserResponse[]>([]);
    const [didRequest, setDidRequest]                       = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try  {
                const data: UserResponse[] | void = await sendRequest(getURL('/users'));
                data && setUsers(data);
            } catch(err) {
                // error handled in error state from useHttp
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