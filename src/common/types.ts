import React from "react";


/**********************
 ****** GENERICS  *****
 **********************/

export type Reducer <
    S = {},
    A = Action < AnyAction > 
>
    = (state: S, action: A) => S;

export type OnClickFunc <
    T = HTMLElement 
>
    = React.MouseEventHandler < T > ;

export type OnSubmitFunc <
    T = HTMLFormElement 
>
    = React.FormEventHandler < T > ;

export type OnChange <
    T = HTMLElement
>
    = React.ChangeEventHandler < T > ;

export type OnBlur <
    T = HTMLElement
>
    = React.FocusEventHandler < T > ;

export type RMutRef <
    T 
>
    = React.MutableRefObject < T | null > ;

export type SetDispatchAction <
    S 
>
    = React.Dispatch < React.SetStateAction < S >> ;

export type ReducerDispatch <
    A,
    P = {} 
>
    = React.Dispatch < Action < A, P >> ;

/**********************
 ****** UTILITY  ******
 **********************/

export interface Identifiable {
    id: string
};

export interface Location {
    lat: number,
    lng: number
};

export interface NIndexable < T > {
    [key: number]: T
};

export interface SIndexable < T > {
    [key: string]: T
};

/**********************
 ****** PROPS  ********
 **********************/

export interface BaseProps {
    children  ? : React.ReactNode,
    style     ? : React.CSSProperties
};

export interface OptCls {
    className ? : string
};

export interface Visibility {
    show: boolean
};

export interface Clickable < T = HTMLElement > {
    onClick: OnClickFunc < T >
};

/**********************
 **** STATE TUPLE  ****
 **********************/

export type UseStateTuple <
    S = {}
>
    = [S, SetDispatchAction < S > ];

export type UseReducerTuple <
    S = {},
    A = AnyAction,
    P = {} 
>
    = [S, ReducerDispatch < A, P > ];

/**********************
 ****  FUNCTIONAL  ****
 **********************/

export type Functional < 
    P = BaseProps, 
    R = JSX.Element 
> 
    = (props: P) => R | null;

export type Portal < 
    P = BaseProps 
> 
    = Functional < P, React.ReactPortal > ;

/**********************
 ***  CORE STRUCTS  ***
 **********************/

export interface User extends Identifiable {
    image      : string,
    name       : string,
    placeQty   : number
};

export interface Place extends Identifiable {
    creatorId  : string,
    title      : string,
    description: string,
    image      : string,
    address    : string,
    location   : Location
};

/**********************
 ***  ROUTE PARAMS  ***
 **********************/

export interface UserPlacesParams {
    userId: string
};

/**********************
 ****** ACTIONS  ******
 **********************/

export interface Action < T, P = {} > {
    type         : T,
    payload      : P,
    validators ? : Validator[] 
};

export interface AnyAction extends Action < 'any-action' > {};

/**********************
 ***** VALIDATION  ****
 **********************/

export enum ValidationType {
    Require,
    MinLength,
    MaxLength,
    MinValue,
    MaxValue,
    Email,
    File
};

export type ValidationValue = string | number | undefined;

export interface Validator {
    type     : ValidationType,
    value  ? : number
};

export type ValidationFunc = (
    value    : string | number, 
    isValid  : boolean, 
    validator: Validator
) => boolean;