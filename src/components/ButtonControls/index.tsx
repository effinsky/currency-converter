import React from "react";

interface ButtonControlsProps {
    onSubmit(e: React.FormEvent<HTMLButtonElement>): void;
    onResetInputs(): void;
}

export const ButtonControls = ({
    onSubmit,
    onResetInputs,
}: ButtonControlsProps) => {
    return (
        <section className="buttons">
            <button
                type="submit"
                onClick={onSubmit}
                className="btn-primary btn-submit"
            >
                Find rate
            </button>

            <button className="btn-primary btn-reset" onClick={onResetInputs}>
                Reset
            </button>
        </section>
    );
};
