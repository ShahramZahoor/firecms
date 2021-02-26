import { Skeleton } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { EntitySchema } from "../models";

export interface AsyncPreviewComponentProps<S extends EntitySchema> {

    builder: Promise<React.ReactNode>;

}

/**
 * Utility component used to render the result of an async execution.
 * It shows a loading indicator while at it.
 *
 * @param buildComponent that needs to do some async
 * @constructor
 */
function AsyncPreviewComponent<S extends EntitySchema>(
    {
        builder
    }: AsyncPreviewComponentProps<S>): JSX.Element {

    const [loading, setLoading] = useState<boolean>(true);
    const [result, setResult] = useState<React.ReactNode>(null);

    useEffect(() => {
        let unmounted = false;
        builder
            .then((res) => {
                if (!unmounted) {
                    setLoading(false);
                    setResult(res);
                }
            })
            .catch(error => {
                setLoading(false);
                console.error(error);
            });
        return () => {
            unmounted = true;
        };
    }, [builder]);

    if (loading)
        return <Skeleton variant="text"/>;

    return <React.Fragment>{result}</React.Fragment>;

}

export default React.memo(AsyncPreviewComponent);
