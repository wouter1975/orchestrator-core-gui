/*
 * Copyright 2019-2020 SURF.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import "components/modals/ConfirmationDialog.scss";

import {
    EuiButton,
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiOverlayMask,
} from "@elastic/eui";
import React from "react";
import { FormattedMessage } from "react-intl";

interface IProps {
    isOpen?: boolean;
    cancel: (e: any) => void;
    confirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
    question?: string;
    leavePage?: boolean;
    isError?: boolean;
}

export default function ConfirmationDialog({
    isOpen = false,
    cancel,
    confirm,
    question = "",
    leavePage = false,
    isError = false,
}: IProps) {
    const modalContent = (
        <div>
            {leavePage ? (
                <section className={`dialog-content ${isError ? " error" : ""}`}>
                    <h2>
                        <FormattedMessage id="confirmation_dialog.leavePage" />
                    </h2>
                    <p>
                        <FormattedMessage id="confirmation_dialog.leavePageSub" />
                    </p>
                </section>
            ) : (
                <section className="dialog-content">
                    <h2>{question}</h2>
                </section>
            )}
        </div>
    );

    let modal;

    if (isOpen) {
        modal = (
            <EuiOverlayMask>
                <EuiModal className="confirm-modal" onClose={cancel} initialFocus="[name=popfirst]">
                    <EuiModalHeader>
                        <EuiModalHeaderTitle>
                            <FormattedMessage id="confirmation_dialog.title" />
                        </EuiModalHeaderTitle>
                    </EuiModalHeader>

                    <EuiModalBody>{modalContent}</EuiModalBody>

                    <EuiModalFooter>
                        <EuiButton onClick={cancel} color="warning" id="dialog-cancel">
                            <FormattedMessage
                                id={leavePage ? "confirmation_dialog.leave" : "confirmation_dialog.cancel"}
                            />
                        </EuiButton>

                        <EuiButton onClick={confirm} fill id="dialog-confirm">
                            <FormattedMessage
                                id={leavePage ? "confirmation_dialog.stay" : "confirmation_dialog.confirm"}
                            />
                        </EuiButton>
                    </EuiModalFooter>
                </EuiModal>
            </EuiOverlayMask>
        );
    }

    return <div className="confirmation-dialog-overlay">{modal}</div>;
}
