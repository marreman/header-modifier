module Background exposing (main)

import Platform


main : Program () () Msg
main =
    Platform.worker
        { init = always ( (), Cmd.none )
        , update = update
        , subscriptions = subscriptions
        }


type alias Substitution =
    { url : String
    , headerName : String
    , headerValue : String
    , headerReplacement : String
    }


type alias Header =
    { name : String
    , value : String
    }


type Msg
    = BeforeSendHeaders (List Substitution) { url : String, requestHeaders : List Header }
    | HeadersReceived (List Substitution) { url : String, responseHeaders : List Header }


update : Msg -> () -> ( (), Cmd Msg )
update msg _ =
    ( (), Cmd.none )


subscriptions : () -> Sub Msg
subscriptions _ =
    Sub.none
