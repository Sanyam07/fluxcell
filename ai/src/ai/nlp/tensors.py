import torch


def mean_tensor(tensors):

    sum_tensor = 0*tensors[0]

    for tensor in tensors:
        sum_tensor += tensor

    return sum_tensor/len(tensors)


def normalize_tensors(tensors):

    center = mean_tensor(tensors)

    return [tensor - center for tensor in tensors]


def PCA(tensors, k=2):

    # preprocessing
    tensor = torch.squeeze(torch.stack(tensors))
    mean = torch.mean(tensor, 0)
    tensor = tensor - mean.expand_as(tensor)

    # SVD
    U, S, V = torch.svd(torch.t(tensor), some=False)
    tensor = torch.mm(tensor, U[:, :k])

    # post processing
    tensor = torch.squeeze(tensor)
    pc_tensors = torch.split(tensor, 1, 0)
    pc_tensors = [torch.squeeze(tensor) for tensor in pc_tensors]

    return pc_tensors
