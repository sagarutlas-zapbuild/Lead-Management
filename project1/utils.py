from API.serializers import UserSerializer


def jwt_response_handler(token, user=None, request=None):
    print("\n\n\n", UserSerializer(user, context={'request': request}).data, "\n",type(UserSerializer(user, context={'request': request}).data),"\n\n\n")
    userdata = {}
    userdata['id'] = UserSerializer(user, context={'request': request}).data.get('id')
    userdata['user_email'] = UserSerializer(user, context={'request': request}).data.get('user_email')
    userdata['user_name'] = UserSerializer(user, context={'request': request}).data.get('user_name')
    print(userdata,"\n\n\n")
    return {
        'token': token,
        'user': userdata
    }