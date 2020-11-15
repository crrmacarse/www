/**
 * Mocking a type-orm entity
 */
export const mockRepository = jest.fn(() => ({
    metadata: {
        columns: [],
        relations: [],
    },
}));